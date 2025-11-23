import IPWhitelist from '../models/IPWhitelist.js';

// @desc    Add IP to whitelist
// @route   POST /api/ip-whitelist/add
// @access  Private (Admin only)
export const addIPToWhitelist = async (req, res) => {
  try {
    const { ipAddress, description } = req.body;

    if (!ipAddress) {
      return res.status(400).json({
        success: false,
        message: 'IP address is required'
      });
    }

    // Check if IP already exists
    const existingIP = await IPWhitelist.findOne({ ipAddress });
    if (existingIP) {
      return res.status(400).json({
        success: false,
        message: 'IP address already whitelisted'
      });
    }

    // Add IP to whitelist
    const whitelistedIP = await IPWhitelist.create({
      ipAddress,
      description: description || '',
      addedBy: req.user._id,
      isActive: true
    });

    res.status(201).json({
      success: true,
      message: 'IP address added to whitelist',
      ip: whitelistedIP
    });

  } catch (error) {
    console.error('Add IP Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get all whitelisted IPs
// @route   GET /api/ip-whitelist
// @access  Private (Admin only)
export const getWhitelistedIPs = async (req, res) => {
  try {
    const ips = await IPWhitelist.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: ips.length,
      ips
    });

  } catch (error) {
    console.error('Get IPs Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Remove IP from whitelist
// @route   DELETE /api/ip-whitelist/:id
// @access  Private (Admin only)
export const removeIPFromWhitelist = async (req, res) => {
  try {
    const ip = await IPWhitelist.findByIdAndDelete(req.params.id);

    if (!ip) {
      return res.status(404).json({
        success: false,
        message: 'IP not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'IP removed from whitelist'
    });

  } catch (error) {
    console.error('Remove IP Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Toggle IP active status
// @route   PATCH /api/ip-whitelist/:id/toggle
// @access  Private (Admin only)
export const toggleIPStatus = async (req, res) => {
  try {
    const ip = await IPWhitelist.findById(req.params.id);

    if (!ip) {
      return res.status(404).json({
        success: false,
        message: 'IP not found'
      });
    }

    ip.isActive = !ip.isActive;
    await ip.save();

    res.status(200).json({
      success: true,
      message: `IP ${ip.isActive ? 'activated' : 'deactivated'}`,
      ip
    });

  } catch (error) {
    console.error('Toggle IP Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};
