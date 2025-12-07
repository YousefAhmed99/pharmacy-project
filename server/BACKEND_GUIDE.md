# Backend Guide - Online Pharmacy System

## 📁 Backend Structure

```
server/
├── index.js                    # Main server file
├── config/
│   └── database.js            # Database configuration
├── controllers/               # Business logic
│   ├── auth.controller.js     # Authentication (register, login)
│   ├── product.controller.js  # Product CRUD operations
│   ├── cart.controller.js     # Cart management
│   ├── order.controller.js     # Order processing
│   ├── prescription.controller.js # Prescription upload/review
│   └── user.controller.js      # User management (Admin)
├── middleware/
│   └── auth.middleware.js     # JWT authentication & authorization
├── models/                    # Database models
│   ├── User.model.js
│   ├── Product.model.js
│   ├── Cart.model.js
│   ├── Order.model.js
│   └── Prescription.model.js
└── routes/                    # API routes
    ├── auth.routes.js
    ├── product.routes.js
    ├── cart.routes.js
    ├── order.routes.js
    ├── prescription.routes.js
    └── user.routes.js
```

## 🚀 Quick Start

### 1. Create .env file

Create a `.env` file in the root directory with:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/pharmacy
JWT_SECRET=your_super_secret_jwt_key_change_this
JWT_EXPIRE=7d
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
FRONTEND_URL=http://localhost:5173
```

### 2. Start MongoDB

Make sure MongoDB is running:
```bash
# Windows (if installed as service, it should auto-start)
# Or start manually:
mongod
```

### 3. Run Backend Server

```bash
# Development mode (with auto-reload)
npm run dev:server

# Production mode
npm run server
```

Server will run on: **http://localhost:5000**

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)

### Products
- `GET /api/products` - Get all products (with query params: search, category, requiresPrescription, page, limit)
- `GET /api/products/:id` - Get single product
- `GET /api/products/categories` - Get all categories
- `POST /api/products` - Create product (Admin only)
- `PUT /api/products/:id` - Update product (Admin only)
- `DELETE /api/products/:id` - Delete product (Admin only)

### Cart
- `GET /api/cart` - Get user cart (Protected)
- `POST /api/cart` - Add item to cart (Protected)
- `PUT /api/cart/:itemId` - Update cart item quantity (Protected)
- `DELETE /api/cart/:itemId` - Remove item from cart (Protected)
- `DELETE /api/cart` - Clear cart (Protected)

### Orders
- `POST /api/orders` - Create order (Protected)
- `GET /api/orders` - Get user orders (Protected)
- `GET /api/orders/:id` - Get single order (Protected)
- `GET /api/orders/all` - Get all orders (Admin only)
- `PUT /api/orders/:id/status` - Update order status (Admin only)

### Prescriptions
- `POST /api/prescriptions` - Upload prescription (Protected, multipart/form-data)
- `GET /api/prescriptions` - Get user prescriptions (Protected)
- `GET /api/prescriptions/all` - Get all prescriptions (Pharmacist/Admin)
- `PUT /api/prescriptions/:id/review` - Review prescription (Pharmacist/Admin)

### Users
- `GET /api/users` - Get all users (Admin only)
- `GET /api/users/:id` - Get single user (Admin only)
- `PUT /api/users/:id` - Update user (Admin only)
- `DELETE /api/users/:id` - Delete user (Admin only)
- `PUT /api/users/profile` - Update own profile (Protected)

## 🔐 Authentication

### Register Request
```json
POST /api/auth/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "customer",  // optional: customer, pharmacist, admin
  "phone": "1234567890",
  "address": {
    "street": "123 Main St",
    "city": "City",
    "state": "State",
    "zipCode": "12345"
  }
}
```

### Login Request
```json
POST /api/auth/login
{
  "email": "john@example.com",
  "password": "password123"
}
```

### Response (with JWT token)
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "customer"
  }
}
```

### Using Token
Include token in Authorization header:
```
Authorization: Bearer <token>
```

## 🗄️ Database Models

### User Model
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  role: String (enum: 'customer', 'pharmacist', 'admin'),
  address: Object,
  phone: String,
  isActive: Boolean,
  lastLogin: Date,
  timestamps: true
}
```

### Product Model
```javascript
{
  name: String (required),
  description: String (required),
  price: Number (required),
  stock: Number (required),
  category: String (required),
  image: String,
  requiresPrescription: Boolean,
  manufacturer: String,
  expiryDate: Date,
  isActive: Boolean,
  timestamps: true
}
```

### Cart Model
```javascript
{
  userId: ObjectId (ref: User, required, unique),
  items: [{
    productId: ObjectId (ref: Product),
    quantity: Number (required, min: 1)
  }],
  timestamps: true
}
```

### Order Model
```javascript
{
  userId: ObjectId (ref: User, required),
  items: [{
    productId: ObjectId (ref: Product),
    name: String,
    quantity: Number,
    price: Number
  }],
  totalPrice: Number (required),
  status: String (enum: 'pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'),
  paymentMethod: String (enum: 'cash', 'visa'),
  paymentStatus: String (enum: 'pending', 'paid', 'failed'),
  shippingAddress: Object,
  prescriptionId: ObjectId (ref: Prescription),
  orderDate: Date,
  deliveryDate: Date,
  timestamps: true
}
```

### Prescription Model
```javascript
{
  userId: ObjectId (ref: User, required),
  filePath: String (required),
  fileType: String (enum: 'image', 'pdf'),
  status: String (enum: 'pending', 'approved', 'rejected'),
  reviewedBy: ObjectId (ref: User),
  reviewDate: Date,
  rejectionReason: String,
  notes: String,
  timestamps: true
}
```

## 🛠️ Testing API with Postman/cURL

### Test Health Check
```bash
curl http://localhost:5000/api/health
```

### Test Register
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Test Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Test Get Products (with token)
```bash
curl http://localhost:5000/api/products \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## 🔧 Troubleshooting

### MongoDB Connection Error
- Make sure MongoDB is running
- Check MONGODB_URI in .env file
- Try: `mongod` to start MongoDB

### Port Already in Use
- Change PORT in .env file
- Or kill process using port 5000

### JWT Token Errors
- Make sure JWT_SECRET is set in .env
- Token expires after 7 days (configurable)

### File Upload Issues
- Cloudinary credentials must be set in .env
- File size limit: 5MB
- Supported formats: Images and PDF

## 📝 Notes

- All routes except `/api/auth/register` and `/api/auth/login` require authentication
- Admin routes require role: 'admin'
- Pharmacist routes require role: 'pharmacist' or 'admin'
- Passwords are automatically hashed using bcrypt
- JWT tokens are used for authentication
- CORS is enabled for frontend communication





