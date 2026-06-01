const express = require('express');
const router = express.Router();
const Razorpay = require('razorpay');
const crypto = require('crypto');

// Initialize Razorpay with provided test keys (fallback to env vars if available)
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_SoACRQ4kcZ0fM8',
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'f1Hg9EmzY7Cx6hjZeADFLmfO',
});

// @route   POST /api/payment/create-order
// @desc    Create a Razorpay order
// @access  Public
router.post('/create-order', async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount) {
      return res.status(400).json({ success: false, message: 'Amount is required' });
    }

    const options = {
      amount: amount * 100, // Amount in paise (1 INR = 100 paise)
      currency: 'INR',
      receipt: `receipt_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      payment_capture: 1, // Auto capture payment
    };

    const order = await razorpay.orders.create(options);

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    res.status(500).json({ success: false, message: 'Failed to create payment order', error: error.message });
  }
});

// @route   POST /api/payment/verify
// @desc    Verify Razorpay payment signature
// @access  Public
router.post('/verify', async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const secret = process.env.RAZORPAY_KEY_SECRET || 'f1Hg9EmzY7Cx6hjZeADFLmfO';

    const shasum = crypto.createHmac('sha256', secret);
    shasum.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const digest = shasum.digest('hex');

    if (digest === razorpay_signature) {
      // Payment verified successfully
      // Here you could update your database to mark the donation as successful
      res.status(200).json({ success: true, message: 'Payment verified successfully' });
    } else {
      res.status(400).json({ success: false, message: 'Invalid payment signature' });
    }
  } catch (error) {
    console.error('Error verifying Razorpay signature:', error);
    res.status(500).json({ success: false, message: 'Failed to verify payment', error: error.message });
  }
});

// Initialize Stripe
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// @route   POST /api/payment/create-stripe-session
// @desc    Create a Stripe Checkout Session
// @access  Public
router.post('/create-stripe-session', async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || Number(amount) <= 0) {
      return res.status(400).json({ success: false, message: 'Valid donation amount is required' });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'inr',
            product_data: {
              name: 'Avyakta NGO Donation',
              description: 'Donation for bringing dignity to unclaimed souls',
            },
            unit_amount: Math.round(amount * 100), // in paise
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${req.headers.origin}/?donation=success&amount=${amount}`,
      cancel_url: `${req.headers.origin}/?donation=cancelled`,
    });

    res.status(200).json({
      success: true,
      url: session.url,
      sessionId: session.id,
    });
  } catch (error) {
    console.error('Error creating Stripe session:', error);
    res.status(500).json({ success: false, message: 'Failed to create Stripe payment session', error: error.message });
  }
});

module.exports = router;
