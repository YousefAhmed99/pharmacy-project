import Product from '../models/Product.model.js';

// @desc    Get all products
// @route   GET /api/products
// @access  Public
export const getProducts = async (req, res) => {
  try {
    const { search, category, requiresPrescription, page = 1, limit = 12 } = req.query;
    
    const query = { isActive: true };
    
    // Improved search - works with or without text index
    if (search) {
      const searchRegex = new RegExp(search, 'i'); // Case-insensitive
      query.$or = [
        { name: searchRegex },
        { description: searchRegex },
        { category: searchRegex },
        { manufacturer: searchRegex },
      ];
    }
    
    if (category) {
      query.category = category;
    }
    
    if (requiresPrescription !== undefined) {
      query.requiresPrescription = requiresPrescription === 'true';
    }
    
    const skip = (page - 1) * limit;
    
    // Build sort - prioritize search relevance if searching
    let sortOptions = { createdAt: -1 };
    if (search) {
      // If searching, sort by name match first
      sortOptions = { name: 1, createdAt: -1 };
    }
    
    const products = await Product.find(query)
      .limit(limit * 1)
      .skip(skip)
      .sort(sortOptions);
    
    const total = await Product.countDocuments(query);
    
    res.json({
      success: true,
      products,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page),
      total,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
export const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Create product
// @route   POST /api/products
// @access  Private/Admin
export const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    
    res.status(201).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private/Admin
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private/Admin
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.json({
      success: true,
      message: 'Product deleted successfully',
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get categories
// @route   GET /api/products/categories
// @access  Public
export const getCategories = async (req, res) => {
  try {
    const categories = await Product.distinct('category');
    res.json({
      success: true,
      categories,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

