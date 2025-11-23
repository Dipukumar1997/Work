import mongoose from 'mongoose';

const feeStructureSchema = new mongoose.Schema({
  class: {
    type: String,
    required: true,
    enum: ['6', '7', '8', '9', '10', '11', '12']
  },
  month: {
    type: String,
    required: true,
    enum: ['January', 'February', 'March', 'April', 'May', 'June', 
           'July', 'August', 'September', 'October', 'November', 'December']
  },
  feeType: {
    type: String,
    required: true,
    default: 'Monthly Tuition Fee'
  },
  amount: {
    type: Number,
    required: true
  },
  academicYear: {
    type: String,
    default: '2024-2025'
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Compound index to ensure unique fee per class-month combination
feeStructureSchema.index({ class: 1, month: 1, academicYear: 1 }, { unique: true });

export default mongoose.model('FeeStructure', feeStructureSchema);
