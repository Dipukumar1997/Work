import express from 'express';
import Event from '../models/Event.js';
import Student from '../models/Student.js';
import Teacher from '../models/Teacher.js';

const router = express.Router();

// @desc    Get campus images (from admin uploaded)
// @route   GET /api/home/campus-images
// @access  Public
router.get('/campus-images', async (req, res) => {
  try {
    // Implement based on your image storage
    res.status(200).json({
      success: true,
      images: []
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @desc    Get school toppers
// @route   GET /api/home/toppers
// @access  Public
router.get('/toppers', async (req, res) => {
  try {
    const toppers = await Student.find()
      .sort({ 'examResults.percentage': -1 })
      .limit(10)
      .select('firstName lastName class examResults');

    res.status(200).json({
      success: true,
      toppers
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @desc    Get teacher profiles
// @route   GET /api/home/teachers
// @access  Public
router.get('/teachers', async (req, res) => {
  try {
    const teachers = await Teacher.find()
      .select('firstName lastName profile subjects')
      .populate('subjects', 'subjectName');

    res.status(200).json({
      success: true,
      teachers
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @desc    Get current events
// @route   GET /api/home/events
// @access  Public
router.get('/events', async (req, res) => {
  try {
    const events = await Event.find({ isActive: true })
      .sort({ eventDate: -1 });

    res.status(200).json({
      success: true,
      events
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
