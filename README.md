# Online Pharmacy System

A full-stack web application for managing an online pharmacy with prescription validation, order management, and role-based access control.

## 🚀 Features

### Customer Features
- User registration and authentication
- Browse and search medicines
- Filter products by category and prescription requirements
- Add products to cart
- Upload prescriptions (Image/PDF)
- Place orders with cash or Visa payment
- Track order status
- View order history

### Pharmacist Features
- Review uploaded prescriptions
- Approve or reject prescriptions
- View pending prescriptions
- Access to order information

### Admin Features
- Manage users (CRUD operations)
- Manage products (CRUD operations)
- Manage categories
- View all orders
- System statistics dashboard
- Manage system settings

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI library
- **TailwindCSS** - Styling framework
- **React Router** - Routing
- **Axios** - HTTP client
- **React Hot Toast** - Notifications
- **Lucide React** - Icons

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Bcryptjs** - Password hashing
- **Multer** - File upload handling
- **Cloudinary** - Cloud file storage

## 📋 Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or cloud instance)
- Cloudinary account (for file uploads)
- npm or yarn

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd pharmacy
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   - Copy `.env.example` to `.env`
   - Update the following variables:
     ```env
     PORT=5000
     MONGODB_URI=mongodb://localhost:27017/pharmacy
     JWT_SECRET=your_super_secret_jwt_key
     JWT_EXPIRE=7d
     CLOUDINARY_CLOUD_NAME=your_cloud_name
     CLOUDINARY_API_KEY=your_api_key
     CLOUDINARY_API_SECRET=your_api_secret
     FRONTEND_URL=http://localhost:5173
     ```

4. **Start MongoDB**
   ```bash
   # If using local MongoDB
   mongod
   ```

5. **Run the application**
   
   **Development mode:**
   ```bash
   # Terminal 1 - Frontend
   npm run dev
   
   # Terminal 2 - Backend
   npm run dev:server
   ```

   **Production mode:**
   ```bash
   # Build frontend
   npm run build
   
   # Start backend
   npm run server
   ```

## 📁 Project Structure

```
pharmacy/
├── server/                 # Backend code
│   ├── config/            # Configuration files
│   ├── controllers/       # Route controllers
│   ├── middleware/        # Custom middleware
│   ├── models/            # Database models
│   ├── routes/            # API routes
│   └── index.js          # Server entry point
├── src/                   # Frontend code
│   ├── components/        # React components
│   │   ├── Auth/         # Authentication components
│   │   └── Layout/       # Layout components
│   ├── contexts/         # React contexts
│   ├── pages/            # Page components
│   ├── utils/            # Utility functions
│   ├── App.jsx           # Main app component
│   └── main.jsx          # Entry point
├── docs/                  # Documentation
│   └── diagrams.md       # System diagrams
├── public/               # Static assets
└── package.json          # Dependencies
```

## 🔐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)

### Products
- `GET /api/products` - Get all products (with filters)
- `GET /api/products/:id` - Get single product
- `GET /api/products/categories` - Get all categories
- `POST /api/products` - Create product (Admin only)
- `PUT /api/products/:id` - Update product (Admin only)
- `DELETE /api/products/:id` - Delete product (Admin only)

### Cart
- `GET /api/cart` - Get user cart (Protected)
- `POST /api/cart` - Add item to cart (Protected)
- `PUT /api/cart/:itemId` - Update cart item (Protected)
- `DELETE /api/cart/:itemId` - Remove item from cart (Protected)
- `DELETE /api/cart` - Clear cart (Protected)

### Orders
- `POST /api/orders` - Create order (Protected)
- `GET /api/orders` - Get user orders (Protected)
- `GET /api/orders/:id` - Get single order (Protected)
- `GET /api/orders/all` - Get all orders (Admin only)
- `PUT /api/orders/:id/status` - Update order status (Admin only)

### Prescriptions
- `POST /api/prescriptions` - Upload prescription (Protected)
- `GET /api/prescriptions` - Get user prescriptions (Protected)
- `GET /api/prescriptions/all` - Get all prescriptions (Pharmacist/Admin)
- `PUT /api/prescriptions/:id/review` - Review prescription (Pharmacist/Admin)

### Users
- `GET /api/users` - Get all users (Admin only)
- `GET /api/users/:id` - Get single user (Admin only)
- `PUT /api/users/:id` - Update user (Admin only)
- `DELETE /api/users/:id` - Delete user (Admin only)
- `PUT /api/users/profile` - Update profile (Protected)

## 🧪 Testing

Test cases and testing instructions will be added in the `tests/` directory.

## 📊 Database Schema

### User
- id, name, email, password, role, address, phone, isActive, timestamps

### Product
- id, name, description, price, stock, category, image, requiresPrescription, manufacturer, expiryDate, isActive, timestamps

### Cart
- id, userId, items[], timestamps

### Order
- id, userId, items[], totalPrice, status, paymentMethod, paymentStatus, shippingAddress, prescriptionId, orderDate, deliveryDate, timestamps

### Prescription
- id, userId, filePath, fileType, status, reviewedBy, reviewDate, rejectionReason, notes, timestamps

## 🎨 UI/UX Features

- Responsive design (mobile, tablet, desktop)
- Modern TailwindCSS styling
- Intuitive navigation
- Real-time notifications
- Loading states
- Error handling
- Form validation

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Protected routes
- Role-based access control
- Input validation
- File upload validation

## 📝 License

This project is licensed under the MIT License.

## 👥 Contributors

- Your Name

## 📞 Support

For support, email support@pharmacy.com or create an issue in the repository.
