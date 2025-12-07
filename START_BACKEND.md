# 🚀 كيفية تشغيل Backend

## الخطوة 1: إنشاء ملف .env

أنشئ ملف `.env` في المجلد الرئيسي `pharmacy/` وأضف المحتوى التالي:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/pharmacy
JWT_SECRET=pharmacy_super_secret_jwt_key_2024
JWT_EXPIRE=7d
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
FRONTEND_URL=http://localhost:5173
```

## الخطوة 2: تأكد من تشغيل MongoDB

```bash
# إذا كان MongoDB مثبت كخدمة، سيعمل تلقائياً
# أو شغله يدوياً:
mongod
```

## الخطوة 3: تشغيل الـ Backend

```bash
# وضع التطوير (مع إعادة التشغيل التلقائي)
npm run dev:server

# أو وضع الإنتاج
npm run server
```

## ✅ التحقق من عمل الـ Backend

افتح المتصفح أو استخدم curl:
```
http://localhost:5000/api/health
```

يجب أن ترى:
```json
{
  "status": "OK",
  "message": "Pharmacy API is running"
}
```

## 📁 ملفات الـ Backend

جميع ملفات الـ Backend موجودة في مجلد `server/`:

- ✅ `server/index.js` - الملف الرئيسي
- ✅ `server/models/` - نماذج قاعدة البيانات (5 ملفات)
- ✅ `server/controllers/` - منطق العمل (6 ملفات)
- ✅ `server/routes/` - مسارات API (6 ملفات)
- ✅ `server/middleware/` - الحماية والمصادقة

## 📡 API Endpoints المتاحة

- `/api/auth/*` - المصادقة (تسجيل، دخول)
- `/api/products/*` - المنتجات
- `/api/cart/*` - سلة التسوق
- `/api/orders/*` - الطلبات
- `/api/prescriptions/*` - الوصفات الطبية
- `/api/users/*` - المستخدمين (Admin)

## 📖 للمزيد من التفاصيل

راجع ملف: `server/BACKEND_GUIDE.md`





