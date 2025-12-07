import { Link } from 'react-router-dom';
import { ShoppingBag, Pill, FileText, Shield } from 'lucide-react';

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white rounded-lg p-12 mb-12">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome to Online Pharmacy
          </h1>
          <p className="text-xl mb-8 text-primary-100">
            Your trusted partner for all your healthcare needs. Order medicines online with ease and convenience.
          </p>
          <Link to="/products" className="bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-primary-50 transition inline-block">
            Shop Now
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="card text-center">
          <ShoppingBag className="w-12 h-12 text-primary-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Easy Ordering</h3>
          <p className="text-gray-600">Browse and order medicines with just a few clicks</p>
        </div>

        <div className="card text-center">
          <Pill className="w-12 h-12 text-pharmacy-green mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Wide Selection</h3>
          <p className="text-gray-600">Extensive range of medicines and healthcare products</p>
        </div>

        <div className="card text-center">
          <FileText className="w-12 h-12 text-pharmacy-blue mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Prescription Upload</h3>
          <p className="text-gray-600">Upload prescriptions for quick validation and ordering</p>
        </div>

        <div className="card text-center">
          <Shield className="w-12 h-12 text-pharmacy-red mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Secure & Safe</h3>
          <p className="text-gray-600">Your data and transactions are completely secure</p>
        </div>
      </section>

      {/* How It Works */}
      <section className="card">
        <h2 className="text-2xl font-bold mb-6">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <div className="w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold mb-4">
              1
            </div>
            <h3 className="font-semibold mb-2">Browse Products</h3>
            <p className="text-gray-600">Search and browse through our wide selection of medicines</p>
          </div>
          <div>
            <div className="w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold mb-4">
              2
            </div>
            <h3 className="font-semibold mb-2">Add to Cart</h3>
            <p className="text-gray-600">Add your required medicines to the cart</p>
          </div>
          <div>
            <div className="w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold mb-4">
              3
            </div>
            <h3 className="font-semibold mb-2">Checkout</h3>
            <p className="text-gray-600">Complete your order with secure payment</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;





