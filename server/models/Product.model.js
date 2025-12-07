import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a product name'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Please provide a description'],
  },
  price: {
    type: Number,
    required: [true, 'Please provide a price'],
    min: [0, 'Price cannot be negative'],
  },
  stock: {
    type: Number,
    required: [true, 'Please provide stock quantity'],
    min: [0, 'Stock cannot be negative'],
    default: 0,
  },
  category: {
    type: String,
    required: [true, 'Please provide a category'],
    trim: true,
  },
  image: {
    type: String,
    default: '',
  },
  requiresPrescription: {
    type: Boolean,
    default: false,
  },
  manufacturer: {
    type: String,
    trim: true,
  },
  expiryDate: {
    type: Date,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

// Indexes for better search performance
productSchema.index({ name: 1 });
productSchema.index({ category: 1 });
productSchema.index({ isActive: 1 });
productSchema.index({ name: 'text', description: 'text', category: 'text', manufacturer: 'text' });

const Product = mongoose.model('Product', productSchema);

export default Product;

