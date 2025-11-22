import mongoose from 'mongoose';

const teacherSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  teacherId: {
    type: String,
    unique: true,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  profile: {
    bio: String,
    qualifications: [String],
    previousWork: [String],
    degrees: [String],
    experience: Number
  },
  subjects: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject'
  }],
  classes: [String],
  paymentDetails: [{
    month: String,
    year: Number,
    amount: Number,
    status: {
      type: String,
      enum: ['pending', 'paid'],
      default: 'pending'
    },
    paidDate: Date
  }],
  joiningDate: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

export default mongoose.model('Teacher', teacherSchema);
