import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../utils/api';
import toast from 'react-hot-toast';
import { ArrowLeft, ShoppingCart } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useLanguage } from '../contexts/LanguageContext';

const ProductDetail = () => {
  const { id } = useParams();
  const { updateCartCount } = useCart();
  const { t } = useLanguage();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await api.get(`/products/${id}`);
      setProduct(response.data.product);
    } catch (error) {
      toast.error('Failed to fetch product');
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async () => {
    try {
      const response = await api.post('/cart', { productId: id, quantity });
      const items = response.data.cart?.items || [];
      const totalQuantity = items.reduce((sum, item) => sum + (item.quantity || 0), 0);
      
      // Update cart count in context
      await updateCartCount();
      
      // Show success message with item count
      toast.success(`${t('productAdded')} - ${totalQuantity} ${t('itemsInCart')}`);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add to cart');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="card text-center py-12">
        <p className="text-gray-600">Product not found</p>
        <Link to="/products" className="text-primary-600 hover:underline mt-4 inline-block">
          Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div>
      <Link
        to="/products"
        className="flex items-center text-gray-600 hover:text-primary-600 mb-6"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to Products
      </Link>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          {product.image ? (
            <img
              src={product.image.startsWith('http') 
                ? product.image 
                : `http://localhost:5000${product.image}`}
              alt={product.name}
              className="w-full h-96 object-cover rounded-lg"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/600x600?text=No+Image';
              }}
            />
          ) : (
            <div className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center">
              <span className="text-gray-400">No Image</span>
            </div>
          )}
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          
          <div className="mb-4">
            <span className="text-4xl font-bold text-primary-600">${product.price}</span>
          </div>

          <div className="mb-4">
            <span className="text-sm text-gray-600">Category: </span>
            <span className="font-semibold">{product.category}</span>
          </div>

          {product.requiresPrescription && (
            <div className="mb-4">
              <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">
                Prescription Required
              </span>
            </div>
          )}

          <div className="mb-4">
            <span className="text-sm text-gray-600">Stock: </span>
            <span className={`font-semibold ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {product.stock > 0 ? `${product.stock} available` : 'Out of Stock'}
            </span>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold mb-2">Description</h3>
            <p className="text-gray-600">{product.description}</p>
          </div>

          {product.stock > 0 && (
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Quantity</label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 border rounded-lg hover:bg-gray-100"
                >
                  -
                </button>
                <span className="text-xl font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="w-10 h-10 border rounded-lg hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>
          )}

          <button
            onClick={addToCart}
            disabled={product.stock === 0}
            className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <ShoppingCart className="w-5 h-5" />
            {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

