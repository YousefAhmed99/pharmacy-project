import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: [1, 'Quantity must be at least 1'],
  },
});

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  items: [cartItemSchema],
}, {
  timestamps: true,
});

// Calculate total
cartSchema.methods.calculateTotal = async function() {
  const Cart = mongoose.model('Cart');
  const Product = mongoose.model('Product');
  
  let total = 0;
  for (const item of this.items) {
    const product = await Product.findById(item.productId);
    if (product) {
      total += product.price * item.quantity;
    }
  }
  return total;
};

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;





