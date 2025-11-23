// import jwt from 'jsonwebtoken';
// import User from '../models/User.js';

// export const authenticateToken = async (req, res, next) => {
//   try {
//     const authHeader = req.headers['authorization'];
//     const token = authHeader && authHeader.split(' ')[1];

//     if (!token) {
//       return res.status(401).json({ 
//         success: false, 
//         message: 'Access denied. No token provided.' 
//       });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
//     const user = await User.findById(decoded.id);
//     if (!user) {
//       return res.status(404).json({ 
//         success: false, 
//         message: 'User not found' 
//       });
//     }

//     req.user = {
//       id: decoded.id,
//       role: decoded.role
//     };
    
//     next();
//   } catch (error) {
//     return res.status(403).json({ 
//       success: false, 
//       message: 'Invalid or expired token' 
//     });
//   }
// };


import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const authenticateToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]; // Bearer TOKEN
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. No token provided.'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key-here');
    
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid token'
      });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Invalid or expired token'
    });
  }
};
