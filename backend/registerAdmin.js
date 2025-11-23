import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/backend')
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => {
    console.error('❌ Connection error:', err);
    process.exit(1);
  });

// User Schema (must match your actual User model)
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['student', 'teacher', 'admin'], required: true },
  isFirstLogin: { type: Boolean, default: true }
});

const User = mongoose.model('User', userSchema);

// Create Admin Function
const createAdmin = async () => {
  try {
    // Admin credentials
    const email = 'admin@arscollege.com';
    const plainPassword = 'Admin@123';

    // Check if admin exists
    const existingAdmin = await User.findOne({ email });
    if (existingAdmin) {
      console.log('\n⚠️  Admin already exists!');
      console.log('Deleting old admin and creating new one...\n');
      await User.deleteOne({ email });
    }

    // PROPERLY hash password with bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(plainPassword, salt);

    console.log('Generated password hash:', hashedPassword);

    // Create admin
    const admin = await User.create({
      email: email,
      password: hashedPassword,
      role: 'admin',
      isFirstLogin: false
    });

    console.log('\n🎉 SUCCESS! Admin registered!\n');
    console.log('═══════════════════════════════');
    console.log('📧 Email:    ', email);
    console.log('🔑 Password: ', plainPassword);
    console.log('👤 Role:     ', 'admin');
    console.log('═══════════════════════════════\n');
    console.log('✅ You can now login at: http://localhost:5173\n');

    // Test the password immediately
    const testMatch = await bcrypt.compare(plainPassword, admin.password);
    console.log('🧪 Password verification test:', testMatch ? '✅ PASS' : '❌ FAIL');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

// Run
setTimeout(createAdmin, 1000); // Give MongoDB time to connect
