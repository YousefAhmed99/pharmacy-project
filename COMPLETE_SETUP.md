# 🎯 الإعداد الكامل للمشروع - خطوة بخطوة

## ✅ الخطوة 1: تثبيت المكتبات

```bash
npm install
```

انتظر حتى يكتمل التثبيت (قد يستغرق دقائق).

---

## ✅ الخطوة 2: إنشاء ملف .env

### الطريقة السريعة (PowerShell):

افتح PowerShell في مجلد المشروع وقم بتنفيذ:

```powershell
@"
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/pharmacy
JWT_SECRET=pharmacy_super_secret_jwt_key_2024_change_this
JWT_EXPIRE=7d
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
FRONTEND_URL=http://localhost:5173
"@ | Out-File -FilePath .env -Encoding utf8
```

### أو إنشاء يدوي:

1. أنشئ ملف جديد باسم `.env` في المجلد الرئيسي
2. انسخ المحتوى من `SETUP_ENV.md`

---

## ✅ الخطوة 3: تشغيل MongoDB

### Windows:

**الطريقة 1: إذا كان مثبت كخدمة**
- افتح Services (services.msc)
- ابحث عن MongoDB
- تأكد أنه يعمل (Running)

**الطريقة 2: تشغيل يدوي**
```bash
mongod
```

**الطريقة 3: استخدام MongoDB Compass**
- افتح MongoDB Compass
- سيتصل تلقائياً

**التحقق:**
```bash
mongosh
# إذا اتصل بنجاح، MongoDB يعمل ✅
```

---

## ✅ الخطوة 4: إضافة البيانات الأولية (Seed Data)

```bash
npm run seed
```

سيتم إنشاء:
- ✅ مستخدم Admin: `admin@pharmacy.com` / `admin123`
- ✅ مستخدم Pharmacist: `pharmacist@pharmacy.com` / `pharmacist123`
- ✅ مستخدم Customer: `customer@pharmacy.com` / `customer123`
- ✅ 10 منتجات تجريبية

---

## ✅ الخطوة 5: تشغيل المشروع

### افتح نافذتين من Terminal:

**Terminal 1 - Backend:**
```bash
npm run dev:server
```

يجب أن ترى:
```
✅ MongoDB connected successfully
🚀 Server running on http://localhost:5000
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

يجب أن ترى:
```
  VITE v5.x.x  ready in xxx ms
  ➜  Local:   http://localhost:5173/
```

---

## ✅ الخطوة 6: فتح المشروع

افتح المتصفح على:
- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:5000/api/health

---

## 🧪 اختبار النظام

### 1. اختبار Backend:
افتح: http://localhost:5000/api/health
يجب أن ترى: `{"status":"OK","message":"Pharmacy API is running"}`

### 2. تسجيل الدخول:
- اذهب إلى: http://localhost:5173/login
- استخدم:
  - **Admin:** `admin@pharmacy.com` / `admin123`
  - **Pharmacist:** `pharmacist@pharmacy.com` / `pharmacist123`
  - **Customer:** `customer@pharmacy.com` / `customer123`

### 3. تصفح المنتجات:
- اذهب إلى: http://localhost:5173/products
- يجب أن ترى 10 منتجات

---

## 📋 ملخص الأوامر

```bash
# 1. تثبيت المكتبات
npm install

# 2. إنشاء .env (يدوياً أو باستخدام PowerShell)

# 3. تشغيل MongoDB
mongod

# 4. إضافة البيانات الأولية
npm run seed

# 5. تشغيل Backend (Terminal 1)
npm run dev:server

# 6. تشغيل Frontend (Terminal 2)
npm run dev
```

---

## 🔑 بيانات الدخول الافتراضية

| الدور | البريد الإلكتروني | كلمة المرور |
|------|------------------|------------|
| Admin | admin@pharmacy.com | admin123 |
| Pharmacist | pharmacist@pharmacy.com | pharmacist123 |
| Customer | customer@pharmacy.com | customer123 |

---

## ❌ حل المشاكل الشائعة

### MongoDB لا يعمل:
```bash
# تحقق من الخدمة
net start MongoDB

# أو شغله يدوياً
mongod
```

### Port 5000 مستخدم:
- غيّر PORT في `.env` إلى 5001
- أو أوقف العملية: `taskkill /F /IM node.exe`

### Module not found:
```bash
npm install
```

### .env لا يعمل:
- تأكد أن الملف اسمه `.env` (مع النقطة)
- تأكد أنه في المجلد الرئيسي
- لا توجد مسافات في الأسماء

---

## 🎉 جاهز!

الآن المشروع جاهز للاستخدام. يمكنك:
- ✅ تسجيل الدخول بأي من الحسابات
- ✅ تصفح المنتجات
- ✅ إضافة للسلة
- ✅ رفع وصفات طبية
- ✅ إنشاء طلبات

**استمتع! 🚀**





