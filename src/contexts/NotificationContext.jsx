import { createContext, useContext, useState, useEffect } from 'react';
import api from '../utils/api';
import { useAuth } from './AuthContext';

const NotificationContext = createContext();

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

export const NotificationProvider = ({ children }) => {
  const { isAuthenticated, user } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const fetchNotifications = async () => {
    if (!isAuthenticated) {
      setNotifications([]);
      setUnreadCount(0);
      return;
    }

    try {
      const response = await api.get('/notifications');
      const fetchedNotifications = response.data.notifications || [];
      setNotifications(fetchedNotifications);
      setUnreadCount(fetchedNotifications.filter(n => !n.read).length);
    } catch (error) {
      // If endpoint doesn't exist, use localStorage
      const userId = localStorage.getItem('user');
      if (userId) {
        try {
          const user = JSON.parse(userId);
          const key = `notifications_${user.id || user._id}`;
          const savedNotifications = localStorage.getItem(key);
          if (savedNotifications) {
            const parsed = JSON.parse(savedNotifications);
            setNotifications(parsed);
            setUnreadCount(parsed.filter(n => !n.read).length);
          } else {
            setNotifications([]);
            setUnreadCount(0);
          }
        } catch (e) {
          // Fallback to old key
          const savedNotifications = localStorage.getItem('notifications');
          if (savedNotifications) {
            const parsed = JSON.parse(savedNotifications);
            setNotifications(parsed);
            setUnreadCount(parsed.filter(n => !n.read).length);
          } else {
            setNotifications([]);
            setUnreadCount(0);
          }
        }
      } else {
        setNotifications([]);
        setUnreadCount(0);
      }
    }
  };

  useEffect(() => {
    if (isAuthenticated && user) {
      fetchNotifications();
      // Poll for new notifications every 10 seconds
      const interval = setInterval(fetchNotifications, 10000);
      
      // Listen for manual notification updates
      const handleNotificationUpdate = () => {
        fetchNotifications();
      };
      window.addEventListener('notificationUpdate', handleNotificationUpdate);
      
      return () => {
        clearInterval(interval);
        window.removeEventListener('notificationUpdate', handleNotificationUpdate);
      };
    } else {
      setNotifications([]);
      setUnreadCount(0);
    }
  }, [isAuthenticated, user]);

  const addNotification = (notification) => {
    const newNotification = {
      ...notification,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      read: false,
      createdAt: new Date().toISOString(),
    };
    
    const updated = [newNotification, ...notifications];
    setNotifications(updated);
    setUnreadCount(prev => prev + 1);
    
    // Save to localStorage with user-specific key
    try {
      const userId = localStorage.getItem('user');
      if (userId) {
        const user = JSON.parse(userId);
        const key = `notifications_${user.id || user._id}`;
        localStorage.setItem(key, JSON.stringify(updated));
      } else {
        localStorage.setItem('notifications', JSON.stringify(updated));
      }
    } catch (e) {
      localStorage.setItem('notifications', JSON.stringify(updated));
    }
    
    // Try to save to backend
    try {
      api.post('/notifications', newNotification).catch(() => {
        // If backend doesn't support it, that's okay
      });
    } catch (error) {
      // Ignore errors
    }
  };

  const markAsRead = async (notificationId) => {
    const updated = notifications.map(n =>
      n.id === notificationId ? { ...n, read: true } : n
    );
    setNotifications(updated);
    setUnreadCount(prev => Math.max(0, prev - 1));
    
    // Save to localStorage with user-specific key
    try {
      const userId = localStorage.getItem('user');
      if (userId) {
        const user = JSON.parse(userId);
        const key = `notifications_${user.id || user._id}`;
        localStorage.setItem(key, JSON.stringify(updated));
      } else {
        localStorage.setItem('notifications', JSON.stringify(updated));
      }
    } catch (e) {
      localStorage.setItem('notifications', JSON.stringify(updated));
    }
    
    try {
      await api.put(`/notifications/${notificationId}/read`).catch(() => {});
    } catch (error) {
      // Ignore errors
    }
  };

  const markAllAsRead = async () => {
    const updated = notifications.map(n => ({ ...n, read: true }));
    setNotifications(updated);
    setUnreadCount(0);
    
    // Save to localStorage with user-specific key
    try {
      const userId = localStorage.getItem('user');
      if (userId) {
        const user = JSON.parse(userId);
        const key = `notifications_${user.id || user._id}`;
        localStorage.setItem(key, JSON.stringify(updated));
      } else {
        localStorage.setItem('notifications', JSON.stringify(updated));
      }
    } catch (e) {
      localStorage.setItem('notifications', JSON.stringify(updated));
    }
    
    try {
      await api.put('/notifications/read-all').catch(() => {});
    } catch (error) {
      // Ignore errors
    }
  };

  const clearNotifications = () => {
    setNotifications([]);
    setUnreadCount(0);
    localStorage.removeItem('notifications');
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        addNotification,
        markAsRead,
        markAllAsRead,
        clearNotifications,
        fetchNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

