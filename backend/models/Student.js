import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  rollNumber: {
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
  class: {
    type: String,
    enum: ['playgroup', 'lkg', 'ukg', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
    required: true
  },
  address: {
    area: String,
    locality: String,
    city: String,
    country: String
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject'
  },
  admissionDate: {
    type: Date,
    default: Date.now
  },
  documents: [{
    docType: {
      type: String,
      enum: ['birth_certificate', 'photo', 'transfer_certificate', 'aadhar', 'other']
    },
    docUrl: String,
    uploadDate: {
      type: Date,
      default: Date.now
    },
    updatePermission: {
      type: Boolean,
      default: false
    }
  }],
  attendanceCriteria: [{
    subjectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Subject'
    },
    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Teacher'
    },
    criteriaMet: {
      type: Boolean,
      default: false
    }
  }],
  paymentHistory: [{
    transactionId: String,
    amount: Number,
    purpose: String,
    date: {
      type: Date,
      default: Date.now
    },
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed'],
      default: 'pending'
    }
  }],
  examResults: [{
    examId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Exam'
    },
    marks: [{
      subjectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject'
      },
      marksObtained: Number,
      totalMarks: Number
    }],
    percentage: Number,
    marksheetUrl: String,
    publishDate: Date
  }]
}, {
  timestamps: true
});

export default mongoose.model('Student', studentSchema);
