const axios = require('axios');

const FAST2SMS_API_KEY = '9c2e7eb4-3a28-11f0-a562-0200cd936042';
const FAST2SMS_URL = 'https://www.fast2sms.com/dev/bulkV2';

const sendOTP = async (mobileNumber) => {
  try {
    // Validate mobile number
    if (!mobileNumber || mobileNumber.length !== 10) {
      throw new Error('Invalid mobile number. Please enter a valid 10-digit mobile number.');
    }

    // Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Prepare message
    const message = `Your OTP for password reset is: ${otp}. Valid for 10 minutes.`;
    
    console.log('Sending OTP to:', mobileNumber);
    
    // Send SMS using Fast2SMS
    const response = await axios.post(FAST2SMS_URL, {
      route: 'v3',
      sender_id: 'TXTIND',
      message: message,
      language: 'english',
      flash: 0,
      numbers: mobileNumber
    }, {
      headers: {
        'authorization': FAST2SMS_API_KEY,
        'Content-Type': 'application/json'
      }
    });

    console.log('Fast2SMS Response:', response.data);

    if (response.data.return === true) {
      console.log('OTP sent successfully:', otp);
      return otp;
    } else {
      console.error('Fast2SMS Error:', response.data);
      throw new Error(response.data.message || 'Failed to send OTP');
    }
  } catch (error) {
    console.error('Error in sendOTP:', error);
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Error response data:', error.response.data);
      console.error('Error response status:', error.response.status);
      throw new Error(error.response.data.message || 'Failed to send OTP. Please try again.');
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received:', error.request);
      throw new Error('No response from SMS service. Please try again.');
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error setting up request:', error.message);
      throw new Error('Failed to send OTP. Please try again.');
    }
  }
};

const verifyOTP = async (mobileNumber, otp) => {
  try {
    // Validate inputs
    if (!mobileNumber || !otp) {
      throw new Error('Mobile number and OTP are required');
    }

    // In production, verify the OTP against the one stored in the database
    // For now, we'll just return true as the verification is handled in the auth routes
    return true;
  } catch (error) {
    console.error('Error in verifyOTP:', error);
    throw error;
  }
};

module.exports = {
  sendOTP,
  verifyOTP
}; 