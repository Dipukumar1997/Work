import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// Connect to database
mongoose.connect('mongodb://localhost:27017/backend');

// Define schemas inline
const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
  role: String,
  isFirstLogin: Boolean
});

const StudentSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  rollNumber: String,
  firstName: String,
  lastName: String,
  class: String,
  dob: Date,
  phone: String
});

const User = mongoose.model('User', UserSchema);
const Student = mongoose.model('Student', StudentSchema);

async function resetStudent() {
  try {
    console.log('🔄 Starting student reset...\n');

    // Step 1: Delete existing records
    console.log('Step 1: Deleting old records...');
    await Student.deleteMany({ rollNumber: '20250200001' });
    await User.deleteMany({ email: 'test@student.com' });
    console.log('✅ Old records deleted\n');

    // Step 2: Create new password
    const plainPassword = '20250200001';
    console.log('Step 2: Hashing password...');
    console.log('Plain password:', plainPassword);
    
    const hashedPassword = await bcrypt.hash(plainPassword, 10);
    console.log('Hashed password:', hashedPassword);
    console.log('✅ Password hashed\n');

    // Step 3: Create User
    console.log('Step 3: Creating user...');
    const user = await User.create({
      email: 'test@student.com',
      password: hashedPassword,
      role: 'student',
      isFirstLogin: true
    });
    console.log('✅ User created with ID:', user._id.toString(), '\n');

    // Step 4: Create Student
    console.log('Step 4: Creating student...');
    const student = await Student.create({
      userId: user._id,
      rollNumber: '20250200001',
      firstName: 'Test',
      lastName: 'Student',
      class: '10',
      dob: new Date('2010-01-01'),
      phone: '9999999999'
    });
    console.log('✅ Student created with ID:', student._id.toString(), '\n');

    // Step 5: Verify password
    console.log('Step 5: Testing password...');
    const isValid = await bcrypt.compare(plainPassword, user.password);
    console.log('Password verification:', isValid ? '✅ SUCCESS' : '❌ FAILED');
    
    if (!isValid) {
      throw new Error('Password verification failed!');
    }

    console.log('\n🎉 SUCCESS! Student created and verified!');
    console.log('\n📝 Login credentials:');
    console.log('Roll Number: 20250200001');
    console.log('Password: 20250200001');
    console.log('\nNow try logging in!');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error(error);
    process.exit(1);
  }
}

resetStudent();
