import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { useCart } from '../../contexts/CartContext';
import { useNotifications } from '../../contexts/NotificationContext';
import { ShoppingCart, User, LogOut, Menu, X, Moon, Sun, Languages, Bell } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

const Header = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const { language, toggleLanguage, t } = useLanguage();
  const { cartItemsCount } = useCart();
  const { unreadCount, notifications, markAsRead, markAllAsRead } = useNotifications();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const notificationsRef = useRef(null);

  // Close notifications when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setNotificationsOpen(false);
      }
    };

    if (notificationsOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [notificationsOpen]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50 transition-colors">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 rtl:space-x-reverse">
            <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">P</span>
            </div>
            <span className="text-xl font-bold text-gray-800 dark:text-white">Pharmacy</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 rtl:space-x-reverse">
            <Link to="/products" className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition">
              {t('products')}
            </Link>
            
            {isAuthenticated ? (
              <>
                {user?.role === 'customer' && (
                  <>
                    <Link to="/cart" className="relative">
                      <ShoppingCart className="w-6 h-6 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition" />
                      {cartItemsCount > 0 && (
                        <span className="absolute -top-2 -right-2 bg-primary-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                          {cartItemsCount > 99 ? '99+' : cartItemsCount}
                        </span>
                      )}
                    </Link>
                    <Link to="/orders" className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition">
                      {t('orders')}
                    </Link>
                    <Link to="/prescriptions" className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition">
                      {t('prescriptions')}
                    </Link>
                    {/* Notifications */}
                    <div className="relative" ref={notificationsRef}>
                      <button
                        onClick={() => setNotificationsOpen(!notificationsOpen)}
                        className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                      >
                        <Bell className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                        {unreadCount > 0 && (
                          <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                            {unreadCount > 99 ? '99+' : unreadCount}
                          </span>
                        )}
                      </button>
                      {notificationsOpen && (
                        <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-xl border dark:border-gray-700 z-50 max-h-96 overflow-y-auto">
                          <div className="p-4 border-b dark:border-gray-700 flex justify-between items-center">
                            <h3 className="font-semibold">Notifications</h3>
                            {unreadCount > 0 && (
                              <button
                                onClick={() => {
                                  markAllAsRead();
                                }}
                                className="text-sm text-primary-600 hover:underline"
                              >
                                Mark all as read
                              </button>
                            )}
                          </div>
                          <div className="divide-y dark:divide-gray-700">
                            {notifications.length === 0 ? (
                              <div className="p-4 text-center text-gray-500">
                                No notifications
                              </div>
                            ) : (
                              notifications.map((notification) => (
                                <div
                                  key={notification.id}
                                  className={`p-4 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer ${
                                    !notification.read ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                                  }`}
                                  onClick={() => {
                                    if (!notification.read) {
                                      markAsRead(notification.id);
                                    }
                                    if (notification.link) {
                                      navigate(notification.link);
                                      setNotificationsOpen(false);
                                    }
                                  }}
                                >
                                  <div className="flex justify-between items-start">
                                    <div className="flex-1">
                                      <p className={`font-medium ${!notification.read ? 'text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-400'}`}>
                                        {notification.title}
                                      </p>
                                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                        {notification.message}
                                      </p>
                                      <p className="text-xs text-gray-400 mt-1">
                                        {new Date(notification.createdAt).toLocaleString()}
                                      </p>
                                    </div>
                                    {!notification.read && (
                                      <div className="w-2 h-2 bg-primary-600 rounded-full ml-2"></div>
                                    )}
                                  </div>
                                </div>
                              ))
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                )}
                
                {(user?.role === 'pharmacist' || user?.role === 'admin') && (
                  <Link to="/dashboard" className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition">
                    {t('dashboard')}
                  </Link>
                )}
                
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  {/* Language Toggle */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      toggleLanguage();
                    }}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 active:scale-95"
                    title={language === 'en' ? 'العربية' : 'English'}
                    aria-label="Toggle Language"
                  >
                    <Languages className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                    <span className="ml-1 text-xs font-medium">{language === 'en' ? 'EN' : 'AR'}</span>
                  </button>
                  
                  {/* Theme Toggle */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      toggleTheme();
                    }}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 active:scale-95 flex items-center justify-center"
                    title={isDark ? 'Light Mode' : 'Dark Mode'}
                    aria-label="Toggle Theme"
                  >
                    {isDark ? (
                      <Sun className="w-5 h-5 text-yellow-500 animate-pulse" />
                    ) : (
                      <Moon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                    )}
                  </button>
                </div>
                
                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <User className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                    <span className="text-gray-700 dark:text-gray-300">{user?.name}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 rtl:space-x-reverse text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>{t('logout')}</span>
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      toggleLanguage();
                    }}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 active:scale-95 flex items-center gap-1"
                    title={language === 'en' ? 'العربية' : 'English'}
                  >
                    <Languages className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                    <span className="text-xs font-medium">{language === 'en' ? 'EN' : 'AR'}</span>
                  </button>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      toggleTheme();
                    }}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 active:scale-95 flex items-center justify-center"
                    title={isDark ? 'Light Mode' : 'Dark Mode'}
                  >
                    {isDark ? (
                      <Sun className="w-5 h-5 text-yellow-500 animate-pulse" />
                    ) : (
                      <Moon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                    )}
                  </button>
                </div>
                <Link to="/login" className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition">
                  {t('login')}
                </Link>
                <Link to="/register" className="btn-primary">
                  {t('register')}
                </Link>
              </>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

          {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t dark:border-gray-700">
            <div className="flex flex-col space-y-4">
              <div className="flex items-center space-x-2 rtl:space-x-reverse mb-2">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    toggleLanguage();
                  }}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 active:scale-95 flex items-center gap-2"
                >
                  <Languages className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                  <span className="text-sm font-medium">{language === 'en' ? 'EN' : 'AR'}</span>
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    toggleTheme();
                  }}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 active:scale-95 flex items-center justify-center"
                >
                  {isDark ? (
                    <Sun className="w-5 h-5 text-yellow-500 animate-pulse" />
                  ) : (
                    <Moon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                  )}
                </button>
              </div>
              <Link to="/products" className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">
                {t('products')}
              </Link>
              
              {isAuthenticated ? (
                <>
                  {user?.role === 'customer' && (
                    <>
                      <Link to="/cart" className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 flex items-center gap-2">
                        {t('cart')}
                        {cartItemsCount > 0 && (
                          <span className="bg-primary-600 text-white text-xs font-bold rounded-full px-2 py-1">
                            {cartItemsCount > 99 ? '99+' : cartItemsCount}
                          </span>
                        )}
                      </Link>
                      <Link to="/orders" className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">
                        {t('orders')}
                      </Link>
                      <Link to="/prescriptions" className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">
                        {t('prescriptions')}
                      </Link>
                      {/* Notifications Mobile */}
                      <button
                        onClick={() => setNotificationsOpen(!notificationsOpen)}
                        className="relative text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 flex items-center gap-2"
                      >
                        <Bell className="w-5 h-5" />
                        <span>Notifications</span>
                        {unreadCount > 0 && (
                          <span className="bg-red-600 text-white text-xs font-bold rounded-full px-2 py-1">
                            {unreadCount > 99 ? '99+' : unreadCount}
                          </span>
                        )}
                      </button>
                    </>
                  )}
                  
                  {(user?.role === 'pharmacist' || user?.role === 'admin') && (
                    <Link to="/dashboard" className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">
                      {t('dashboard')}
                    </Link>
                  )}
                  
                  <div className="pt-4 border-t dark:border-gray-700">
                    <div className="text-gray-700 dark:text-gray-300 mb-2">{user?.name}</div>
                    <button
                      onClick={handleLogout}
                      className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-500"
                    >
                      {t('logout')}
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <Link to="/login" className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">
                    {t('login')}
                  </Link>
                  <Link to="/register" className="btn-primary">
                    {t('register')}
                  </Link>
                </>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;

