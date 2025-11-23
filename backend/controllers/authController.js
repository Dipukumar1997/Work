import User from '../models/User.js';
import Student from '../models/Student.js';
import Teacher from '../models/Teacher.js';
// import Admin from '../models/Admin.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// Generate JWT Token
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET || 'your-secret-key-123', {
    expiresIn: '7d'
  });
};

// @desc    Register Admin (First time only)
// @route   POST /api/auth/register-admin
// @access  Public (but only works if no users exist)
// export const registerAdmin = async (req, res) => {
//   try {
//     const { email, password, firstName, lastName } = req.body;

//     // Only allow if no users exist
//     const userCount = await User.countDocuments();
    
//     // if (userCount > 0) {
//     //   return res.status(403).json({
//     //     success: false,
//     //     message: 'Admin registration is disabled. Contact existing admin.'
//     //   });
//     // }

//     // Validate input
//     if (!email || !password) {
//       return res.status(400).json({
//         success: false,
//         message: 'Please provide email and password'
//       });
//     }

//     if (password.length < 6) {
//       return res.status(400).json({
//         success: false,
//         message: 'Password must be at least 6 characters'
//       });
//     }

//     // Check if email already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({
//         success: false,
//         message: 'Email already registered'
//       });
//     }

//     // Hash password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create admin user
//     const user = await User.create({
//       email,
//       password: hashedPassword,
//       role: 'admin',
//       isFirstLogin: false
//     });

//     // Create admin profile
//     await Admin.create({
//       userId: user._id,
//       firstName: firstName || 'Admin',
//       lastName: lastName || 'User'
//     });

//     // Generate token
//     const token = generateToken(user._id, user.role);

//     res.status(201).json({
//       success: true,
//       message: 'Admin registered successfully',
//       token,
//       user: {
//         id: user._id,
//         email: user.email,
//         role: user.role
//       }
//     });
//   } catch (error) {
//     console.error('Register Admin Error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Server error',
//       error: error.message
//     });
//   }
// };



export const registerAdmin = async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    // Only allow if no users exist
    const userCount = await User.countDocuments();
    
    // Commented out to allow multiple admins
    // if (userCount > 0) {
    //   return res.status(403).json({
    //     success: false,
    //     message: 'Admin registration is disabled. Contact existing admin.'
    //   });
    // }

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password'
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters'
      });
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Email already registered'
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create admin user
    const user = await User.create({
      email,
      password: hashedPassword,
      role: 'admin',
      isFirstLogin: false
    });

    // REMOVE THIS - Admin model doesn't exist!
    // await Admin.create({
    //   userId: user._id,
    //   firstName: firstName || 'Admin',
    //   lastName: lastName || 'User'
    // });

    // Generate token
    const token = generateToken(user._id, user.role);

    // Log successful admin creation
    console.log('✅ Admin created successfully:', email);

    res.status(201).json({
      success: true,
      message: 'Admin registered successfully',
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Register Admin Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};


// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
// export const login = async (req, res) => {
//   try {
//     const { email, rollNumber, password } = req.body;

//     console.log('=== LOGIN ATTEMPT ===');
//     console.log('Email:', email);
//     console.log('Roll Number:', rollNumber);
//     console.log('Password provided:', !!password);

//     let user = null;
//     let userRole = null;

//     // Student login with roll number
//     if (rollNumber) {
//       console.log('Searching for student with roll number:', rollNumber);
      
//       const student = await Student.findOne({ rollNumber }).populate('userId');
      
//       console.log('Student search result:', student ? 'Found' : 'Not found');
      
//       if (!student || !student.userId) {
//         console.log('Student not found or userId missing');
//         return res.status(401).json({
//           success: false,
//           message: 'Invalid roll number or password'
//         });
//       }
      
//       user = student.userId;
//       userRole = 'student';
//       console.log('User from student found');
//     }
//     // Admin/Teacher login with email
//     else if (email) {
//       console.log('Searching for user with email:', email);
      
//       user = await User.findOne({ email });
      
//       console.log('User search result:', user ? 'Found' : 'Not found');
      
//       if (!user) {
//         console.log('User not found');
//         return res.status(401).json({
//           success: false,
//           message: 'Invalid email or password'
//         });
//       }
      
//       userRole = user.role;
//     }
//     else {
//       console.log('No email or roll number provided');
//       return res.status(400).json({
//         success: false,
//         message: 'Please provide email or roll number'
//       });
//     }

//     // Check if user exists
//     if (!user) {
//       console.log('User object is null');
//       return res.status(401).json({
//         success: false,
//         message: 'Invalid credentials'
//       });
//     }

//     console.log('Comparing passwords...');
    

    
//     // Verify password
//     // const isPasswordValid = await bcrypt.compare(password, user.password);

//     // Verify password - USE bcrypt.compare directly
//       const isPasswordValid = await bcrypt.compare(password, user.password);

//       console.log('Password comparison:', {
//         provided: password,
//         stored: user.password,
//         match: isPasswordValid
//       });

//       if (!isPasswordValid) {
//         console.log('Password mismatch');
//         return res.status(401).json({
//           success: false,
//           message: 'Invalid credentials'
//         });
//       }

    
//     console.log('Password validation result:', isPasswordValid);
    
//     if (!isPasswordValid) {
//       console.log('Password mismatch');
//       return res.status(401).json({
//         success: false,
//         message: 'Invalid credentials'
//       });
//     }

//     // Generate JWT token
//     const token = jwt.sign(
//       { 
//         userId: user._id, 
//         role: userRole,
//         email: user.email 
//       },
//       process.env.JWT_SECRET || 'your-secret-key-123',
//       { expiresIn: '7d' }
//     );

//     console.log('Login successful! Token generated.');
//     console.log('=== LOGIN SUCCESS ===');

//     // Send success response
//     return res.status(200).json({
//       success: true,
//       message: 'Login successful',
//       token,
//       user: {
//         id: user._id,
//         email: user.email,
//         role: userRole,
//         isFirstLogin: user.isFirstLogin || false
//       }
//     });

//   } catch (error) {
//     console.error('=== LOGIN ERROR ===');
//     console.error('Error details:', error);
    
//     return res.status(500).json({
//       success: false,
//       message: 'Server error during login',
//       error: error.message
//     });
//   }
// };




export const login = async (req, res) => {
  try {
    const { email, rollNumber, password } = req.body;

    console.log('=== LOGIN ATTEMPT ===');
    console.log('Email:', email);
    console.log('Roll Number:', rollNumber);
    console.log('Password provided:', !!password);

    let user = null;
    let userRole = null;

    // Student login with roll number
    if (rollNumber) {
      console.log('Searching for student with roll number:', rollNumber);
      
      const student = await Student.findOne({ rollNumber }).populate('userId');
      
      console.log('Student search result:', student ? 'Found' : 'Not found');
      
      if (!student || !student.userId) {
        console.log('Student not found or userId missing');
        return res.status(401).json({
          success: false,
          message: 'Invalid roll number or password'
        });
      }
      
      user = student.userId;
      userRole = 'student';
      console.log('User from student found');
    }
    // Admin/Teacher login with email
    else if (email) {
      console.log('Searching for user with email:', email);
      
      user = await User.findOne({ email });
      
      console.log('User search result:', user ? 'Found' : 'Not found');
      
      if (!user) {
        console.log('User not found');
        return res.status(401).json({
          success: false,
          message: 'Invalid email or password'
        });
      }
      
      userRole = user.role;
    }
    else {
      console.log('No email or roll number provided');
      return res.status(400).json({
        success: false,
        message: 'Please provide email or roll number'
      });
    }

    // Check if user exists
    if (!user) {
      console.log('User object is null');
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    console.log('Comparing passwords...');
    
    // Verify password - USE bcrypt.compare directly
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    console.log('Password comparison:', {
      provided: password,
      storedHash: user.password.substring(0, 20) + '...', // Only show first 20 chars
      match: isPasswordValid
    });
    
    if (!isPasswordValid) {
      console.log('❌ Password mismatch');
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    console.log('✅ Password matched!');

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: user._id, 
        role: userRole,
        email: user.email 
      },
      process.env.JWT_SECRET || 'your-secret-key-123',
      { expiresIn: '7d' }
    );

    console.log('✅ Login successful! Token generated.');
    console.log('=== LOGIN SUCCESS ===');

    // Send success response
    return res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        email: user.email,
        role: userRole,
        isFirstLogin: user.isFirstLogin || false
      }
    });

  } catch (error) {
    console.error('=== LOGIN ERROR ===');
    console.error('Error details:', error);
    
    return res.status(500).json({
      success: false,
      message: 'Server error during login',
      error: error.message
    });
  }
};


// @desc    Update password on first login
// @route   PUT /api/auth/first-login
// @access  Private
export const firstLoginPasswordUpdate = async (req, res) => {
  try {
    const { newPassword } = req.body;

    if (!newPassword || newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long'
      });
    }

    const user = await User.findById(req.user.id);
    
    if (!user.isFirstLogin) {
      return res.status(400).json({
        success: false,
        message: 'Password already updated'
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.isFirstLogin = false;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Password updated successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Change password
// @route   PUT /api/auth/change-password
// @access  Private
export const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    const user = await User.findById(req.user.id);
    
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: 'Current password is incorrect'
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Password changed successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Verify token
// @route   GET /api/auth/verify
// @access  Private
export const verifyToken = async (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user
  });
};
