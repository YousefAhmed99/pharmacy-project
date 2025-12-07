import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import toast from 'react-hot-toast';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

const Cart = () => {
  const { updateCartCount } = useCart();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const response = await api.get('/cart');
      const cartData = response.data.cart;
      // Ensure total is a valid number
      if (cartData && (cartData.total === null || cartData.total === undefined || isNaN(cartData.total))) {
        // Calculate total from items if total is missing
        const calculatedTotal = cartData.items?.reduce((sum, item) => {
          const price = item.productId?.price || 0;
          const quantity = item.quantity || 0;
          return sum + (price * quantity);
        }, 0) || 0;
        cartData.total = calculatedTotal;
      }
      setCart(cartData);
    } catch (error) {
      toast.error('Failed to fetch cart');
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    
    try {
      const response = await api.put(`/cart/${itemId}`, { quantity: newQuantity });
      const cartData = response.data.cart;
      // Ensure total is a valid number
      if (cartData && (cartData.total === null || cartData.total === undefined || isNaN(cartData.total))) {
        const calculatedTotal = cartData.items?.reduce((sum, item) => {
          const price = item.productId?.price || 0;
          const quantity = item.quantity || 0;
          return sum + (price * quantity);
        }, 0) || 0;
        cartData.total = calculatedTotal;
      }
      setCart(cartData);
      await updateCartCount();
      toast.success('Cart updated');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update cart');
    }
  };

  const removeItem = async (itemId) => {
    try {
      const response = await api.delete(`/cart/${itemId}`);
      const cartData = response.data.cart;
      // Ensure total is a valid number
      if (cartData && (cartData.total === null || cartData.total === undefined || isNaN(cartData.total))) {
        const calculatedTotal = cartData.items?.reduce((sum, item) => {
          const price = item.productId?.price || 0;
          const quantity = item.quantity || 0;
          return sum + (price * quantity);
        }, 0) || 0;
        cartData.total = calculatedTotal;
      }
      setCart(cartData);
      await updateCartCount();
      toast.success('Item removed from cart');
    } catch (error) {
      toast.error('Failed to remove item');
    }
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="card text-center py-12">
        <ShoppingBag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
        <p className="text-gray-600 mb-6">Add some products to your cart</p>
        <button
          onClick={() => navigate('/products')}
          className="btn-primary"
        >
          Browse Products
        </button>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          {cart.items.map((item) => (
            <div key={item._id} className="card flex items-center gap-4">
              {item.productId?.image && (
                <img
                  src={item.productId.image}
                  alt={item.productId.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />
              )}
              
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{item.productId?.name}</h3>
                <p className="text-gray-600 text-sm">{item.productId?.category}</p>
                <p className="text-primary-600 font-bold mt-2">
                  ${item.productId?.price} × {item.quantity} = ${(item.productId?.price * item.quantity).toFixed(2)}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQuantity(item._id, item.quantity - 1)}
                  className="w-8 h-8 border rounded hover:bg-gray-100 flex items-center justify-center"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center font-semibold">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item._id, item.quantity + 1)}
                  className="w-8 h-8 border rounded hover:bg-gray-100 flex items-center justify-center"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={() => removeItem(item._id)}
                className="text-red-600 hover:text-red-700 p-2"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>

        <div className="card h-fit">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          <div className="space-y-2 mb-4">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>${(cart.total || 0).toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping:</span>
              <span>Free</span>
            </div>
            <div className="border-t pt-2 flex justify-between font-bold text-lg">
              <span>Total:</span>
              <span className="text-primary-600">${(cart.total || 0).toFixed(2)}</span>
            </div>
          </div>
          <button
            onClick={handleCheckout}
            className="w-full btn-primary"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;





