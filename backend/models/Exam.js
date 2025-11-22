import mongoose from 'mongoose';

const examSchema = new mongoose.Schema({
  examName: {
    type: String,
    required: true
  },
  examType: {
    type: String,
    enum: ['mid-term', 'final', 'unit-test', 'annual'],
    required: true
  },
  examDate: {
    type: Date,
    required: true
  },
  class: {
    type: String,
    required: true
  },
  subjects: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject'
  }],
  admitCardAvailable: {
    type: Boolean,
    default: false
  },
  resultPublished: {
    type: Boolean,
    default: false
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

export default mongoose.model('Exam', examSchema);
