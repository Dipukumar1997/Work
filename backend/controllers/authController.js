import User from '../models/User.js';
import Student from '../models/Student.js';
import Teacher from '../models/Teacher.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// import User from '../models/User.js';
// import Student from '../models/Student.js';
// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';

// import User from '../models/User.js';
// import Student from '../models/Student.js';
// import Teacher from '../models/Teacher.js';
// import Admin from '../models/Admin.js';
// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';


// Generate JWT Token
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
};




export const registerAdmin = async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    // Only allow if no users exist
    const userCount = await User.countDocuments();
    
    if (userCount > 0) {
      return res.status(403).json({
        success: false,
        message: 'Admin registration is disabled. Contact existing admin.'
      });
    }

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

    // Create admin user
    const user = await User.create({
      email,
      password,
      role: 'admin',
      isFirstLogin: false
    });

    // Generate token
    const token = generateToken(user._id, user.role);

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
//     const { email, password } = req.body;

//     // Validate input
//     if (!email || !password) {
//       return res.status(400).json({
//         success: false,
//         message: 'Please provide email and password'
//       });
//     }

//     // Find user
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(401).json({
//         success: false,
//         message: 'Invalid credentials'
//       });
//     }

//     // Check password
//     const isPasswordMatch = await user.comparePassword(password);
//     if (!isPasswordMatch) {
//       return res.status(401).json({
//         success: false,
//         message: 'Invalid credentials'
//       });
//     }

//     // Generate token
//     const token = generateToken(user._id, user.role);

//     res.status(200).json({
//       success: true,
//       message: 'Login successful',
//       token,
//       user: {
//         id: user._id,
//         email: user.email,
//         role: user.role,
//         isFirstLogin: user.isFirstLogin
//       }
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: 'Server error',
//       error: error.message
//     });
//   }
// };

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

    user.password = newPassword;
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
    
    const isMatch = await user.comparePassword(oldPassword);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: 'Current password is incorrect'
      });
    }

    user.password = newPassword;
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


// export const login = async (req, res) => {
//   try {
//     const { email, rollNumber, password } = req.body;

//     let user;
//     let userData;

//     // Check if login is with roll number (student)
//     if (rollNumber) {
//       const student = await Student.findOne({ rollNumber }).populate('userId');
//       if (!student) {
//         return res.status(401).json({
//           success: false,
//           message: 'Invalid roll number or password'
//         });
//       }
//       user = student.userId;
//       userData = student;
//     } 
//     // Login with email (teacher/admin)
//     else if (email) {
//       user = await User.findOne({ email });
//       if (!user) {
//         return res.status(401).json({
//           success: false,
//           message: 'Invalid email or password'
//         });
//       }
      
//       // Get teacher/admin data
//       if (user.role === 'teacher') {
//         userData = await Teacher.findOne({ userId: user._id });
//       } else if (user.role === 'admin') {
//         userData = await Admin.findOne({ userId: user._id });
//       }
//     } else {
//       return res.status(400).json({
//         success: false,
//         message: 'Please provide email or roll number'
//       });
//     }

//     // Verify password
//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//       return res.status(401).json({
//         success: false,
//         message: 'Invalid credentials'
//       });
//     }

//     // Generate JWT token
//     const token = jwt.sign(
//       { 
//         userId: user._id, 
//         role: user.role,
//         email: user.email 
//       },
//       process.env.JWT_SECRET,
//       { expiresIn: '7d' }
//     );

//     res.status(200).json({
//       success: true,
//       message: 'Login successful',
//       token,
//       user: {
//         id: user._id,
//         email: user.email,
//         role: user.role,
//         rollNumber: rollNumber || null,
//         isFirstLogin: user.isFirstLogin
//       }
//     });

//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: 'Server error',
//       error: error.message
//     });
//   }
// };




// @desc    Login user
// @route   POST /api/auth/login
// @access  Public


// export const login = async (req, res) => {
//   try {
//     const { email, rollNumber, password } = req.body;

//     console.log('Login attempt:', { email, rollNumber }); // Debug log

//     let user;

//     // Check if login is with roll number (student)
//     if (rollNumber) {
//       const student = await Student.findOne({ rollNumber }).populate('userId');
//       if (!student) {
//         return res.status(401).json({
//           success: false,
//           message: 'Invalid roll number or password'
//         });
//       }
//       user = student.userId;
//     } 
//     // Login with email (teacher/admin)
//     else if (email) {
//       user = await User.findOne({ email });
//       if (!user) {
//         return res.status(401).json({
//           success: false,
//           message: 'Invalid email or password'
//         });
//       }
//     } else {
//       return res.status(400).json({
//         success: false,
//         message: 'Please provide email or roll number'
//       });
//     }

//     console.log('User found:', user); // Debug log

//     // Verify password
//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//       return res.status(401).json({
//         success: false,
//         message: 'Invalid credentials'
//       });
//     }

//     // Generate JWT token
//     const token = jwt.sign(
//       { 
//         userId: user._id, 
//         role: user.role,
//         email: user.email 
//       },
//       process.env.JWT_SECRET || 'your-secret-key-here',
//       { expiresIn: '7d' }
//     );

//     res.status(200).json({
//       success: true,
//       message: 'Login successful',
//       token,
//       user: {
//         id: user._id,
//         email: user.email,
//         role: user.role,
//         isFirstLogin: user.isFirstLogin || false
//       }
//     });

//   } catch (error) {
//     console.error('Login Error:', error); // Debug log
//     res.status(500).json({
//       success: false,
//       message: 'Server error',
//       error: error.message
//     });
//   }
// };




// export const login = async (req, res) => {
//   try {
//     const { email, rollNumber, password } = req.body;

//     console.log('Login attempt:', { email, rollNumber, password: '***' }); // Debug

//     let user = null;

//     // Student login with roll number
//     if (rollNumber) {
//       console.log('Looking for student with roll number:', rollNumber);
      
//       const student = await Student.findOne({ rollNumber }).populate('userId');
      
//       if (!student) {
//         console.log('Student not found');
//         return res.status(401).json({
//           success: false,
//           message: 'Invalid roll number or password'
//         });
//       }
      
//       console.log('Student found:', student);
//       user = student.userId;
//     }
//     // Admin/Teacher login with email
//     else if (email) {
//       console.log('Looking for user with email:', email);
//       user = await User.findOne({ email });
      
//       if (!user) {
//         console.log('User not found');
//         return res.status(401).json({
//           success: false,
//           message: 'Invalid email or password'
//         });
//       }
//     }
//     else {
//       return res.status(400).json({
//         success: false,
//         message: 'Please provide email or roll number'
//       });
//     }

//     if (!user) {
//       return res.status(401).json({
//         success: false,
//         message: 'Invalid credentials'
//       });
//     }

//     console.log('User found, checking password');

//     // Verify password
//     const isPasswordValid = await bcrypt.compare(password, user.password);
    
//     console.log('Password valid:', isPasswordValid);
    
//     if (!isPasswordValid) {
//       return res.status(401).json({
//         success: false,
//         message: 'Invalid credentials'
//       });
//     }

//     // Generate token
//     const token = jwt.sign(
//       { 
//         userId: user._id, 
//         role: user.role,
//         email: user.email 
//       },
//       process.env.JWT_SECRET || 'your-secret-key-here',
//       { expiresIn: '7d' }
//     );

//     console.log('Login successful');

//     return res.status(200).json({
//       success: true,
//       message: 'Login successful',
//       token,
//       user: {
//         id: user._id,
//         email: user.email,
//         role: user.role,
//         isFirstLogin: user.isFirstLogin || false
//       }
//     });

//   } catch (error) {
//     console.error('Login Error:', error);
//     return res.status(500).json({
//       success: false,
//       message: 'Server error',
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
      console.log('User from student:', user);
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
    console.log('Stored hash:', user.password);
    
    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    console.log('Password validation result:', isPasswordValid);
    
    if (!isPasswordValid) {
      console.log('Password mismatch');
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

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

    console.log('Login successful! Token generated.');
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
    console.error('Error stack:', error.stack);
    
    return res.status(500).json({
      success: false,
      message: 'Server error during login',
      error: error.message
    });
  }
};
