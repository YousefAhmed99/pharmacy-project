import Prescription from '../models/Prescription.model.js';
import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure Cloudinary (if credentials are provided)
const hasCloudinaryConfig = 
  process.env.CLOUDINARY_CLOUD_NAME && 
  process.env.CLOUDINARY_CLOUD_NAME !== 'your_cloud_name' &&
  process.env.CLOUDINARY_API_KEY &&
  process.env.CLOUDINARY_API_KEY !== 'your_api_key';

if (hasCloudinaryConfig) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
}

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, '../../uploads/prescriptions');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, `prescription-${uniqueSuffix}${ext}`);
  },
});

export const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/') || file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only images and PDF files are allowed'), false);
    }
  },
});

// @desc    Upload prescription
// @route   POST /api/prescriptions
// @access  Private
export const uploadPrescription = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Please upload a file' });
    }

    let filePath;
    let fileType = req.file.mimetype.startsWith('image/') ? 'image' : 'pdf';

    // Try Cloudinary first if configured, otherwise use local storage
    if (hasCloudinaryConfig) {
      try {
        // Read file buffer
        const fileBuffer = fs.readFileSync(req.file.path);
        
        // Upload to Cloudinary
        const result = await new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            {
              folder: 'prescriptions',
              resource_type: 'auto',
            },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          );
          uploadStream.end(fileBuffer);
        });

        filePath = result.secure_url;
        
        // Delete local file after Cloudinary upload
        fs.unlinkSync(req.file.path);
      } catch (cloudinaryError) {
        console.error('Cloudinary upload failed, using local storage:', cloudinaryError.message);
        // Fallback to local storage
        filePath = `/uploads/prescriptions/${req.file.filename}`;
      }
    } else {
      // Use local storage
      filePath = `/uploads/prescriptions/${req.file.filename}`;
    }
    
    const prescription = await Prescription.create({
      userId: req.user.id,
      filePath: filePath,
      fileType: fileType,
    });
    
    res.status(201).json({
      success: true,
      prescription,
    });
  } catch (error) {
    // Clean up file if error occurred
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get user prescriptions
// @route   GET /api/prescriptions
// @access  Private
export const getMyPrescriptions = async (req, res) => {
  try {
    const prescriptions = await Prescription.find({ userId: req.user.id })
      .populate('reviewedBy', 'name email')
      .sort({ createdAt: -1 });
    
    res.json({
      success: true,
      prescriptions,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get all prescriptions (Pharmacist/Admin)
// @route   GET /api/prescriptions/all
// @access  Private/Pharmacist/Admin
export const getAllPrescriptions = async (req, res) => {
  try {
    const { status } = req.query;
    const query = {};
    
    if (status) {
      query.status = status;
    }
    
    const prescriptions = await Prescription.find(query)
      .populate('userId', 'name email')
      .populate('reviewedBy', 'name email')
      .sort({ createdAt: -1 });
    
    res.json({
      success: true,
      prescriptions,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Review prescription
// @route   PUT /api/prescriptions/:id/review
// @access  Private/Pharmacist/Admin
export const reviewPrescription = async (req, res) => {
  try {
    const { status, rejectionReason, notes } = req.body;
    
    if (!status || !['approved', 'rejected'].includes(status)) {
      return res.status(400).json({ message: 'Please provide a valid status' });
    }
    
    const prescription = await Prescription.findById(req.params.id);
    
    if (!prescription) {
      return res.status(404).json({ message: 'Prescription not found' });
    }
    
    prescription.status = status;
    prescription.reviewedBy = req.user.id;
    prescription.reviewDate = new Date();
    
    if (status === 'rejected' && rejectionReason) {
      prescription.rejectionReason = rejectionReason;
    }
    
    if (notes) {
      prescription.notes = notes;
    }
    
    await prescription.save();
    
    res.json({
      success: true,
      prescription,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

