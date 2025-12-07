import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import api from '../utils/api';
import toast from 'react-hot-toast';
import { Package, Users, Pill, FileText, TrendingUp } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalUsers: 0,
    totalProducts: 0,
    pendingPrescriptions: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      // Fetch different stats based on role
      if (user?.role === 'admin') {
        // Admin can see all stats
        const [ordersRes, usersRes, productsRes, prescriptionsRes] = await Promise.all([
          api.get('/orders/all'),
          api.get('/users'),
          api.get('/products'),
          api.get('/prescriptions/all?status=pending'),
        ]);

        setStats({
          totalOrders: ordersRes.data.orders.length,
          totalUsers: usersRes.data.users.length,
          totalProducts: productsRes.data.products.length,
          pendingPrescriptions: prescriptionsRes.data.prescriptions.length,
        });
      } else if (user?.role === 'pharmacist') {
        // Pharmacist sees prescriptions and orders
        const [prescriptionsRes, ordersRes] = await Promise.all([
          api.get('/prescriptions/all?status=pending'),
          api.get('/orders/all'),
        ]);

        setStats({
          totalOrders: ordersRes.data.orders.length,
          pendingPrescriptions: prescriptionsRes.data.prescriptions.length,
        });
      }
    } catch (error) {
      toast.error('Failed to fetch statistics');
    } finally {
      setLoading(false);
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
      <h1 className="text-3xl font-bold mb-6">
        {user?.role === 'admin' ? 'Admin' : 'Pharmacist'} Dashboard
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {user?.role === 'admin' && (
          <>
            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Total Users</p>
                  <p className="text-3xl font-bold mt-2">{stats.totalUsers}</p>
                </div>
                <Users className="w-12 h-12 text-primary-600" />
              </div>
            </div>

            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Total Products</p>
                  <p className="text-3xl font-bold mt-2">{stats.totalProducts}</p>
                </div>
                <Pill className="w-12 h-12 text-pharmacy-green" />
              </div>
            </div>
          </>
        )}

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Orders</p>
              <p className="text-3xl font-bold mt-2">{stats.totalOrders}</p>
            </div>
            <Package className="w-12 h-12 text-pharmacy-blue" />
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Pending Prescriptions</p>
              <p className="text-3xl font-bold mt-2">{stats.pendingPrescriptions}</p>
            </div>
            <FileText className="w-12 h-12 text-yellow-600" />
          </div>
        </div>
      </div>

      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {user?.role === 'admin' && (
            <>
              <Link to="/admin/products" className="btn-secondary text-center">
                Manage Products
              </Link>
              <a href="/users" className="btn-secondary text-center">
                Manage Users
              </a>
            </>
          )}
          <Link to="/prescriptions" className="btn-secondary text-center">
            Review Prescriptions
          </Link>
          {user?.role === 'admin' ? (
            <Link to="/admin/orders" className="btn-secondary text-center">
              View All Orders
            </Link>
          ) : (
            <a href="/orders" className="btn-secondary text-center">
              View Orders
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;





