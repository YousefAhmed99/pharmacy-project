import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import toast from 'react-hot-toast';
import { CreditCard, Wallet } from 'lucide-react';

const Checkout = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    paymentMethod: 'cash',
    shippingAddress: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
    },
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
    fetchUserProfile();
  }, []);

  const fetchCart = async () => {
    try {
      const response = await api.get('/cart');
      setCart(response.data.cart);
      
      if (!response.data.cart || response.data.cart.items.length === 0) {
        toast.error('Cart is empty');
        navigate('/cart');
      }
    } catch (error) {
      toast.error('Failed to fetch cart');
      navigate('/cart');
    } finally {
      setLoading(false);
    }
  };

  const fetchUserProfile = async () => {
    try {
      const response = await api.get('/auth/me');
      if (response.data.user.address) {
        setFormData(prev => ({
          ...prev,
          shippingAddress: response.data.user.address,
        }));
      }
    } catch (error) {
      console.error('Failed to fetch user profile');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name.startsWith('shippingAddress.')) {
      const addressField = name.split('.')[1];
      setFormData({
        ...formData,
        shippingAddress: {
          ...formData.shippingAddress,
          [addressField]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await api.post('/orders', {
        paymentMethod: formData.paymentMethod,
        shippingAddress: formData.shippingAddress,
      });

      toast.success('Order placed successfully!');
      navigate('/orders');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to place order');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!cart || cart.items.length === 0) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
        {/* Shipping Address */}
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Street</label>
              <input
                type="text"
                name="shippingAddress.street"
                value={formData.shippingAddress.street}
                onChange={handleChange}
                className="input-field"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">City</label>
                <input
                  type="text"
                  name="shippingAddress.city"
                  value={formData.shippingAddress.city}
                  onChange={handleChange}
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">State</label>
                <input
                  type="text"
                  name="shippingAddress.state"
                  value={formData.shippingAddress.state}
                  onChange={handleChange}
                  className="input-field"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Zip Code</label>
              <input
                type="text"
                name="shippingAddress.zipCode"
                value={formData.shippingAddress.zipCode}
                onChange={handleChange}
                className="input-field"
                required
              />
            </div>
          </div>
        </div>

        {/* Payment & Order Summary */}
        <div className="space-y-6">
          {/* Payment Method */}
          <div className="card">
            <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
            <div className="space-y-3">
              <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cash"
                  checked={formData.paymentMethod === 'cash'}
                  onChange={handleChange}
                  className="mr-3"
                />
                <Wallet className="w-5 h-5 mr-2" />
                <span>Cash on Delivery</span>
              </label>
              <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="visa"
                  checked={formData.paymentMethod === 'visa'}
                  onChange={handleChange}
                  className="mr-3"
                />
                <CreditCard className="w-5 h-5 mr-2" />
                <span>Visa Card</span>
              </label>
            </div>
          </div>

          {/* Order Summary */}
          <div className="card">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-2 mb-4">
              {cart.items.map((item, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span>
                    {item.productId?.name} × {item.quantity}
                  </span>
                  <span>${(item.productId?.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="border-t pt-2 space-y-2">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>${cart.total?.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between font-bold text-lg border-t pt-2">
                <span>Total:</span>
                <span className="text-primary-600">${cart.total?.toFixed(2)}</span>
              </div>
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="w-full btn-primary mt-4 disabled:opacity-50"
            >
              {submitting ? 'Placing Order...' : 'Place Order'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Checkout;





