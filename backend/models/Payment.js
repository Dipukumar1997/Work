import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  class: {
    type: String,
    required: true
  },
  month: {
    type: String,
    required: true
  },
  feeType: {
    type: String,
    default: 'Monthly Tuition Fee'
  },
  amount: {
    type: Number,
    required: true
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending'
  },
  transactionId: {
    type: String,
    unique: true,
    sparse: true
  },
  paymentDate: {
    type: Date
  },
  paymentMethod: {
    type: String,
    enum: ['online', 'cash', 'cheque'],
    default: 'online'
  },
  academicYear: {
    type: String,
    default: '2024-2025'
  }
}, {
  timestamps: true
});

export default mongoose.model('Payment', paymentSchema);
