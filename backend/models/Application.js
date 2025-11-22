import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  adminResponse: String,
  submittedDate: {
    type: Date,
    default: Date.now
  },
  respondedDate: Date
}, {
  timestamps: true
});

export default mongoose.model('Application', applicationSchema);
