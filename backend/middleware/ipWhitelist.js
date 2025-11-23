import IPWhitelist from '../models/IPWhitelist.js';

// Default localhost IPs (always allowed)
const DEFAULT_ALLOWED_IPS = [
  '127.0.0.1',
  '::1',
  '::ffff:127.0.0.1'
];

export const checkIPWhitelist = async (req, res, next) => {
  try {
    // Get client IP address
    const clientIP = req.ip || 
                     req.connection.remoteAddress || 
                     req.socket.remoteAddress ||
                     (req.headers['x-forwarded-for'] || '').split(',')[0].trim();

    console.log('Admin registration attempt from IP:', clientIP);

    // Check if it's localhost
    const isLocalhost = DEFAULT_ALLOWED_IPS.some(ip => 
      clientIP.includes(ip) || ip === clientIP
    );

    if (isLocalhost) {
      console.log('✅ Localhost IP allowed:', clientIP);
      return next();
    }

    // Check database for whitelisted IPs
    const whitelistedIP = await IPWhitelist.findOne({
      ipAddress: clientIP,
      isActive: true
    });

    if (whitelistedIP) {
      console.log('✅ IP whitelisted from database:', clientIP);
      return next();
    }

    // IP not allowed
    console.log('❌ IP not whitelisted:', clientIP);
    return res.status(403).json({
      success: false,
      message: 'Access denied. Your IP address is not authorized for admin registration.',
      ip: clientIP
    });

  } catch (error) {
    console.error('IP Whitelist check error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error checking IP whitelist'
    });
  }
};
