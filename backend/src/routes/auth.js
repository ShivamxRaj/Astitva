const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { sendOTP, verifyOTP } = require('../utils/otpService');

// POST /api/auth/login - Login route
router.post('/login', (req, res) => {
  res.json({ message: 'Login route working' });
});

// POST /api/auth/register - Register route
router.post('/register', (req, res) => {
  res.json({ message: 'Register route working' });
});

// Send OTP for password recovery
router.post('/send-otp', async (req, res) => {
  try {
    const { mobileNumber } = req.body;

    if (!mobileNumber) {
      return res.status(400).json({ message: 'Mobile number is required' });
    }

    // Validate mobile number format
    if (!/^\d{10}$/.test(mobileNumber)) {
      return res.status(400).json({ message: 'Please enter a valid 10-digit mobile number' });
    }

    // Check if user exists
    const user = await User.findOne({ phone: mobileNumber });
    if (!user) {
      return res.status(404).json({ message: 'No account found with this mobile number' });
    }

    // Check if there's an existing OTP that hasn't expired
    if (user.otp && user.otpExpiry > new Date()) {
      const timeLeft = Math.ceil((user.otpExpiry - new Date()) / 1000 / 60);
      return res.status(400).json({ 
        message: `Please wait ${timeLeft} minutes before requesting a new OTP`
      });
    }

    // Generate and send OTP
    const otp = await sendOTP(mobileNumber);
    
    // Store OTP in user document (in production, use a separate OTP collection with expiration)
    user.otp = otp;
    user.otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // OTP valid for 10 minutes
    await user.save();

    res.json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({ 
      message: error.message || 'Failed to send OTP. Please try again.'
    });
  }
});

// Verify OTP
router.post('/verify-otp', async (req, res) => {
  try {
    const { mobileNumber, otp } = req.body;

    if (!mobileNumber || !otp) {
      return res.status(400).json({ message: 'Mobile number and OTP are required' });
    }

    const user = await User.findOne({ phone: mobileNumber });
    if (!user) {
      return res.status(404).json({ message: 'No account found with this mobile number' });
    }

    // Check if OTP exists
    if (!user.otp) {
      return res.status(400).json({ message: 'No OTP found. Please request a new OTP' });
    }

    // Check if OTP is expired
    if (user.otpExpiry < new Date()) {
      return res.status(400).json({ message: 'OTP has expired. Please request a new OTP' });
    }

    // Check if OTP matches
    if (user.otp !== otp) {
      return res.status(400).json({ message: 'Invalid OTP. Please try again' });
    }

    // Clear OTP after successful verification
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();

    res.json({ message: 'OTP verified successfully' });
  } catch (error) {
    console.error('Error verifying OTP:', error);
    res.status(500).json({ 
      message: error.message || 'Failed to verify OTP. Please try again.'
    });
  }
});

// Reset password
router.post('/reset-password', async (req, res) => {
  try {
    const { mobileNumber, otp, newPassword } = req.body;

    if (!mobileNumber || !otp || !newPassword) {
      return res.status(400).json({ 
        message: 'Mobile number, OTP, and new password are required' 
      });
    }

    // Validate password strength
    if (newPassword.length < 6) {
      return res.status(400).json({ 
        message: 'Password must be at least 6 characters long' 
      });
    }

    const user = await User.findOne({ phone: mobileNumber });
    if (!user) {
      return res.status(404).json({ message: 'No account found with this mobile number' });
    }

    // Verify OTP again before allowing password reset
    if (!user.otp || user.otp !== otp || user.otpExpiry < new Date()) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update password and clear OTP
    user.password = hashedPassword;
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();

    res.json({ message: 'Password reset successful' });
  } catch (error) {
    console.error('Error resetting password:', error);
    res.status(500).json({ 
      message: error.message || 'Failed to reset password. Please try again.'
    });
  }
});

module.exports = router; 