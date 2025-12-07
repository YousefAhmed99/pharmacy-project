# 🔧 إعداد ملف .env

## خطوات إنشاء ملف .env

### الطريقة 1: إنشاء يدوي

1. افتح المجلد الرئيسي للمشروع (`pharmacy/`)
2. أنشئ ملف جديد باسم `.env` (مع النقطة في البداية)
3. انسخ والصق المحتوى التالي:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Connection
# استخدم MongoDB المحلي أو MongoDB Atlas
MONGODB_URI=mongodb://localhost:27017/pharmacy

# JWT Authentication
JWT_SECRET=pharmacy_super_secret_jwt_key_2024_change_this_in_production
JWT_EXPIRE=7d

# Cloudinary (لرفع الملفات - اختياري)
# احصل على البيانات من https://cloudinary.com
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Email (للإشعارات - اختياري)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

# Frontend URL
FRONTEND_URL=http://localhost:5173
```

### الطريقة 2: استخدام PowerShell

افتح PowerShell في مجلد المشروع وقم بتنفيذ:

```powershell
@"
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/pharmacy
JWT_SECRET=pharmacy_super_secret_jwt_key_2024
JWT_EXPIRE=7d
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
FRONTEND_URL=http://localhost:5173
"@ | Out-File -FilePath .env -Encoding utf8
```

### الطريقة 3: استخدام Command Prompt

```cmd
echo PORT=5000 > .env
echo NODE_ENV=development >> .env
echo MONGODB_URI=mongodb://localhost:27017/pharmacy >> .env
echo JWT_SECRET=pharmacy_super_secret_jwt_key_2024 >> .env
echo JWT_EXPIRE=7d >> .env
echo FRONTEND_URL=http://localhost:5173 >> .env
```

## ⚠️ ملاحظات مهمة

1. **JWT_SECRET**: غيّر هذه القيمة إلى مفتاح عشوائي قوي في الإنتاج
2. **MONGODB_URI**: 
   - للمحلي: `mongodb://localhost:27017/pharmacy`
   - لـ MongoDB Atlas: `mongodb+srv://username:password@cluster.mongodb.net/pharmacy`
3. **Cloudinary**: اختياري - مطلوب فقط لرفع الوصفات الطبية
4. **Email**: اختياري - للإشعارات

## ✅ التحقق

بعد إنشاء الملف، تأكد من:
- الملف موجود في المجلد الرئيسي (`pharmacy/.env`)
- الاسم صحيح: `.env` (مع النقطة)
- لا توجد مسافات إضافية

## 🚀 بعد الإعداد

بعد إنشاء `.env`، يمكنك:
1. تشغيل الـ Backend: `npm run dev:server`
2. إضافة بيانات أولية: `npm run seed`
3. تشغيل الـ Frontend: `npm run dev`





