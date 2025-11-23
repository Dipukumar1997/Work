import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from './models/User.js';
import Student from './models/Student.js';

mongoose.connect('mongodb://localhost:27017/backend');

async function createTestStudent() {
  try {
    // Delete existing if any
    await Student.deleteOne({ rollNumber: '20250200001' });
    await User.deleteOne({ email: 'teststudent@school.com' });

    const rollNumber = '20250200001';
    const password = '20250200001'; // Plain text password

    console.log('Creating student with:');
    console.log('Roll Number:', rollNumber);
    console.log('Password:', password);

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Hashed password:', hashedPassword);

    // Create user
    const user = await User.create({
      email: 'teststudent@school.com',
      password: hashedPassword,
      role: 'student',
      isFirstLogin: true
    });

    console.log('User created:', user._id);

    // Create student
    const student = await Student.create({
      userId: user._id,
      rollNumber: rollNumber,
      firstName: 'Test',
      lastName: 'Student',
      class: '10',
      dob: new Date('2010-01-01'),
      phone: '1234567890',
      admissionDate: new Date()
    });

    console.log('Student created:', student._id);
    
    // Test password immediately
    const testCompare = await bcrypt.compare(password, user.password);
    console.log('Password test (should be true):', testCompare);

    console.log('\n✅ Test student created successfully!');
    console.log('Login with:');
    console.log('Roll Number: 20250200001');
    console.log('Password: 20250200001');

    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

createTestStudent();
