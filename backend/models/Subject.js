import mongoose from 'mongoose';

const subjectSchema = new mongoose.Schema({
  subjectName: {
    type: String,
    required: true
  },
  subjectCode: {
    type: String,
    required: true,
    unique: true
  },
  class: {
    type: String,
    required: true
  },
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher'
  },
  attendanceCriteria: {
    type: Number,
    default: 75,
    min: 0,
    max: 100
  }
}, {
  timestamps: true
});

export default mongoose.model('Subject', subjectSchema);
