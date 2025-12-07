import mongoose from 'mongoose';

const prescriptionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  filePath: {
    type: String,
    required: [true, 'Please upload a prescription file'],
  },
  fileType: {
    type: String,
    enum: ['image', 'pdf'],
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  },
  reviewedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  reviewDate: {
    type: Date,
  },
  rejectionReason: {
    type: String,
  },
  notes: {
    type: String,
  },
}, {
  timestamps: true,
});

const Prescription = mongoose.model('Prescription', prescriptionSchema);

export default Prescription;





