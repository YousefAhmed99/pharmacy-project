import { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

const translations = {
  en: {
    // Navigation
    home: 'Home',
    products: 'Products',
    cart: 'Cart',
    orders: 'My Orders',
    prescriptions: 'Prescriptions',
    dashboard: 'Dashboard',
    login: 'Login',
    register: 'Register',
    logout: 'Logout',
    
    // Auth
    email: 'Email',
    password: 'Password',
    name: 'Name',
    confirmPassword: 'Confirm Password',
    phone: 'Phone',
    address: 'Address',
    street: 'Street',
    city: 'City',
    state: 'State',
    zipCode: 'Zip Code',
    
    // Products
    search: 'Search products...',
    addToCart: 'Add to Cart',
    view: 'View',
    outOfStock: 'Out of Stock',
    price: 'Price',
    stock: 'Stock',
    category: 'Category',
    description: 'Description',
    quantity: 'Quantity',
    
    // Cart
    shoppingCart: 'Shopping Cart',
    orderSummary: 'Order Summary',
    subtotal: 'Subtotal',
    total: 'Total',
    proceedToCheckout: 'Proceed to Checkout',
    emptyCart: 'Your cart is empty',
    
    // Orders
    myOrders: 'My Orders',
    orderNumber: 'Order #',
    orderDate: 'Order Date',
    status: 'Status',
    paymentMethod: 'Payment Method',
    noOrders: 'No orders yet',
    
    // Prescriptions
    uploadPrescription: 'Upload Prescription',
    selectFile: 'Select File (Image or PDF)',
    uploading: 'Uploading...',
    viewPrescription: 'View Prescription',
    pending: 'Pending',
    approved: 'Approved',
    rejected: 'Rejected',
    
    // Common
    loading: 'Loading...',
    save: 'Save',
    cancel: 'Cancel',
    delete: 'Delete',
    edit: 'Edit',
    close: 'Close',
    productAdded: 'Product added to cart',
    itemsInCart: 'items in cart',
  },
  ar: {
    // Navigation
    home: 'الرئيسية',
    products: 'المنتجات',
    cart: 'السلة',
    orders: 'طلباتي',
    prescriptions: 'الوصفات الطبية',
    dashboard: 'لوحة التحكم',
    login: 'تسجيل الدخول',
    register: 'التسجيل',
    logout: 'تسجيل الخروج',
    
    // Auth
    email: 'البريد الإلكتروني',
    password: 'كلمة المرور',
    name: 'الاسم',
    confirmPassword: 'تأكيد كلمة المرور',
    phone: 'الهاتف',
    address: 'العنوان',
    street: 'الشارع',
    city: 'المدينة',
    state: 'المحافظة',
    zipCode: 'الرمز البريدي',
    
    // Products
    search: 'ابحث عن منتجات...',
    addToCart: 'أضف للسلة',
    view: 'عرض',
    outOfStock: 'غير متوفر',
    price: 'السعر',
    stock: 'المخزون',
    category: 'الفئة',
    description: 'الوصف',
    quantity: 'الكمية',
    
    // Cart
    shoppingCart: 'سلة التسوق',
    orderSummary: 'ملخص الطلب',
    subtotal: 'المجموع الفرعي',
    total: 'الإجمالي',
    proceedToCheckout: 'إتمام الطلب',
    emptyCart: 'سلة التسوق فارغة',
    
    // Orders
    myOrders: 'طلباتي',
    orderNumber: 'رقم الطلب',
    orderDate: 'تاريخ الطلب',
    status: 'الحالة',
    paymentMethod: 'طريقة الدفع',
    noOrders: 'لا توجد طلبات',
    
    // Prescriptions
    uploadPrescription: 'رفع وصفة طبية',
    selectFile: 'اختر ملف (صورة أو PDF)',
    uploading: 'جاري الرفع...',
    viewPrescription: 'عرض الوصفة',
    pending: 'قيد المراجعة',
    approved: 'موافق عليه',
    rejected: 'مرفوض',
    
    // Common
    loading: 'جاري التحميل...',
    save: 'حفظ',
    cancel: 'إلغاء',
    delete: 'حذف',
    edit: 'تعديل',
    close: 'إغلاق',
    productAdded: 'تم إضافة المنتج للسلة',
    itemsInCart: 'منتج في السلة',
  },
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('language') || 'en';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const t = (key) => {
    return translations[language][key] || key;
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};





