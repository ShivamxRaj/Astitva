const express = require('express');
const router = express.Router();
const twilio = require('twilio');

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
const SERVICE_SID = process.env.TWILIO_VERIFY_SERVICE_SID;

// Send OTP
router.post('/send-otp', async (req, res) => {
  const { phone } = req.body;
  try {
    await client.verify.v2.services(SERVICE_SID)
      .verifications
      .create({ to: phone, channel: 'sms' });
    res.json({ success: true, message: 'OTP sent' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Verify OTP
router.post('/verify-otp', async (req, res) => {
  const { phone, code } = req.body;
  try {
    const verification_check = await client.verify.v2.services(SERVICE_SID)
      .verificationChecks
      .create({ to: phone, code });
    res.json({ success: verification_check.status === 'approved' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router; 