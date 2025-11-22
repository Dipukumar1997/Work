import mongoose from 'mongoose';

const admissionSchema = new mongoose.Schema({
  applicationId: {
    type: String,
    unique: true,
    required: true
  },
  basicDetails: {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    dob: Date,
    email: {
      type: String,
      required: true
    },
    phone: String,
    parentName: String,
    parentContact: String,
    class: String
  },
  documents: [{
    docType: String,
    docUrl: String,
    uploadDate: {
      type: Date,
      default: Date.now
    }
  }],
  payment: {
    transactionId: String,
    amount: Number,
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed'],
      default: 'pending'
    },
    paymentDate: Date
  },
  status: {
    type: String,
    enum: ['submitted', 'approved', 'rejected'],
    default: 'submitted'
  },
  submittedDate: {
    type: Date,
    default: Date.now
  },
  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  assignedRollNumber: String,
  admissionPdfUrl: String
}, {
  timestamps: true
});

export default mongoose.model('Admission', admissionSchema);
