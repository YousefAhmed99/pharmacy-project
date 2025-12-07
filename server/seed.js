import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.model.js';
import Product from './models/Product.model.js';
import { generateProducts } from './generateProducts.js';

dotenv.config();

const seedData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/pharmacy', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to MongoDB');

    // Clear existing data (optional - comment out if you want to keep existing data)
    await User.deleteMany({});
    await Product.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Create Admin User
    // Note: Password will be hashed automatically by the pre('save') hook in User.model.js
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@pharmacy.com',
      password: 'admin123', // Will be hashed by pre('save') hook
      role: 'admin',
      phone: '1234567890',
      address: {
        street: '123 Admin Street',
        city: 'Admin City',
        state: 'Admin State',
        zipCode: '12345',
      },
    });
    console.log('✅ Created Admin User:', admin.email, '| Password: admin123');

    // Create Pharmacist User
    const pharmacist = await User.create({
      name: 'Pharmacist User',
      email: 'pharmacist@pharmacy.com',
      password: 'pharmacist123', // Will be hashed by pre('save') hook
      role: 'pharmacist',
      phone: '1234567891',
      address: {
        street: '456 Pharmacy Street',
        city: 'Pharmacy City',
        state: 'Pharmacy State',
        zipCode: '12346',
      },
    });
    console.log('✅ Created Pharmacist User:', pharmacist.email, '| Password: pharmacist123');

    // Create Customer User
    const customer = await User.create({
      name: 'Customer User',
      email: 'customer@pharmacy.com',
      password: 'customer123', // Will be hashed by pre('save') hook
      role: 'customer',
      phone: '1234567892',
      address: {
        street: '789 Customer Street',
        city: 'Customer City',
        state: 'Customer State',
        zipCode: '12347',
      },
    });
    console.log('✅ Created Customer User:', customer.email, '| Password: customer123');

    // Generate 100 products with images
    const products = generateProducts();
    
    // Insert products into database
    const createdProducts = await Product.insertMany(products);
    console.log(`✅ Created ${createdProducts.length} products with images`);

    console.log('\n🎉 Seed data created successfully!');
    console.log('\n📋 Login Credentials:');
    console.log('   Admin:      admin@pharmacy.com / admin123');
    console.log('   Pharmacist: pharmacist@pharmacy.com / pharmacist123');
    console.log('   Customer:   customer@pharmacy.com / customer123');
    console.log('\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
