import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import { Search, Filter } from 'lucide-react';
import toast from 'react-hot-toast';
import { useCart } from '../contexts/CartContext';
import { useLanguage } from '../contexts/LanguageContext';

const Products = () => {
  const { updateCartCount } = useCart();
  const { t } = useLanguage();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    requiresPrescription: '',
  });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [filters, page]);

  const fetchCategories = async () => {
    try {
      const response = await api.get('/products/categories');
      setCategories(response.data.categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params = {
        page,
        limit: 12,
      };
      
      // Only include non-empty filters
      if (filters.search && filters.search.trim()) {
        params.search = filters.search.trim();
      }
      if (filters.category) {
        params.category = filters.category;
      }
      if (filters.requiresPrescription) {
        params.requiresPrescription = filters.requiresPrescription;
      }
      
      const response = await api.get('/products', { params });
      setProducts(response.data.products);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      toast.error('Failed to fetch products');
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters({ ...filters, [key]: value });
    setPage(1);
  };

  const addToCart = async (productId) => {
    try {
      const response = await api.post('/cart', { productId, quantity: 1 });
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

  if (loading && products.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Products</h1>

      {/* Filters */}
      <div className="card mb-6">
        <div className="grid md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              className="input-field pl-10"
            />
          </div>

          <select
            value={filters.category}
            onChange={(e) => handleFilterChange('category', e.target.value)}
            className="input-field"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <select
            value={filters.requiresPrescription}
            onChange={(e) => handleFilterChange('requiresPrescription', e.target.value)}
            className="input-field"
          >
            <option value="">All Products</option>
            <option value="false">No Prescription Required</option>
            <option value="true">Prescription Required</option>
          </select>
        </div>
      </div>

      {/* Products Grid */}
      {products.length === 0 ? (
        <div className="card text-center py-12">
          <p className="text-gray-600">No products found</p>
        </div>
      ) : (
        <>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-6">
            {products.map((product) => (
              <div key={product._id} className="card hover:shadow-lg transition">
                {product.image ? (
                  <img
                    src={product.image.startsWith('http') 
                      ? product.image 
                      : `http://localhost:5000${product.image}`}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/400x300?text=No+Image';
                    }}
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                    <span className="text-gray-400">No Image</span>
                  </div>
                )}
                <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                  {product.description}
                </p>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold text-primary-600">
                    ${product.price}
                  </span>
                  {product.requiresPrescription && (
                    <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                      Rx Required
                    </span>
                  )}
                </div>
                <div className="flex gap-2">
                  <Link
                    to={`/products/${product._id}`}
                    className="flex-1 btn-secondary text-center"
                  >
                    View
                  </Link>
                  <button
                    onClick={() => addToCart(product._id)}
                    className="flex-1 btn-primary"
                    disabled={product.stock === 0}
                  >
                    {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-2">
              <button
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
                className="btn-secondary disabled:opacity-50"
              >
                Previous
              </button>
              <span className="flex items-center px-4">
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() => setPage(page + 1)}
                disabled={page === totalPages}
                className="btn-secondary disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Products;

