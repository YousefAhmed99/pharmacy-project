import { useState, useEffect } from 'react';
import api from '../utils/api';
import toast from 'react-hot-toast';
import { Package, User, CheckCircle, XCircle, Clock } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const AdminOrders = () => {
  const { t } = useLanguage();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await api.get('/orders/all');
      setOrders(response.data.orders);
    } catch (error) {
      toast.error('Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, status) => {
    try {
      await api.put(`/orders/${orderId}/status`, { status });
      toast.success('Order status updated');
      fetchOrders();
    } catch (error) {
      toast.error('Failed to update order status');
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'cancelled':
        return <XCircle className="w-5 h-5 text-red-600" />;
      default:
        return <Clock className="w-5 h-5 text-yellow-600" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">All Orders</h1>

      {orders.length === 0 ? (
        <div className="card text-center py-12">
          <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">No orders yet</h2>
          <p className="text-gray-600">Orders will appear here</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order._id} className="card">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-lg">Order #{order._id.slice(-8)}</h3>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(order.status)}
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(order.status)}`}>
                        {order.status.toUpperCase()}
                      </span>
                    </div>
                  </div>
                  
                  {/* User Information */}
                  <div className="flex items-center gap-2 mb-2 text-sm text-gray-600">
                    <User className="w-4 h-4" />
                    <span className="font-medium">Customer:</span>
                    <span>{order.userId?.name || 'Unknown'}</span>
                    <span className="text-gray-400">•</span>
                    <span>{order.userId?.email || 'N/A'}</span>
                  </div>
                  
                  <p className="text-sm text-gray-600">
                    Date: {new Date(order.orderDate || order.createdAt).toLocaleDateString()} {new Date(order.orderDate || order.createdAt).toLocaleTimeString()}
                  </p>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="space-y-2 mb-4">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex justify-between">
                      <span>{item.name || item.productId?.name} × {item.quantity}</span>
                      <span>${((item.price || item.productId?.price || 0) * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                
                <div className="flex justify-between font-bold text-lg border-t pt-2 mb-4">
                  <span>Total:</span>
                  <span className="text-primary-600">${order.totalPrice?.toFixed(2)}</span>
                </div>
                
                <div className="text-sm text-gray-600 mb-4">
                  <div>Payment: {order.paymentMethod?.toUpperCase() || 'N/A'} - {order.paymentStatus || 'N/A'}</div>
                  {order.shippingAddress && (
                    <div className="mt-1">
                      Address: {order.shippingAddress.street}, {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
                    </div>
                  )}
                </div>

                {/* Status Update Buttons */}
                <div className="flex gap-2 mt-4">
                  {order.status !== 'processing' && (
                    <button
                      onClick={() => updateOrderStatus(order._id, 'processing')}
                      className="btn-secondary text-sm"
                    >
                      Mark as Processing
                    </button>
                  )}
                  {order.status !== 'delivered' && (
                    <button
                      onClick={() => updateOrderStatus(order._id, 'delivered')}
                      className="btn-primary text-sm"
                    >
                      Mark as Delivered
                    </button>
                  )}
                  {order.status !== 'cancelled' && (
                    <button
                      onClick={() => {
                        if (window.confirm('Are you sure you want to cancel this order?')) {
                          updateOrderStatus(order._id, 'cancelled');
                        }
                      }}
                      className="btn-secondary text-sm bg-red-600 text-white hover:bg-red-700"
                    >
                      Cancel Order
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminOrders;

