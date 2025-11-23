import mongoose from 'mongoose';

const ipWhitelistSchema = new mongoose.Schema({
  ipAddress: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  description: {
    type: String,
    default: ''
  },
  isActive: {
    type: Boolean,
    default: true
  },
  addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('IPWhitelist', ipWhitelistSchema);
