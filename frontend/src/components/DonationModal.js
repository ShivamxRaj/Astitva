import React, { useState, useEffect } from 'react';
import {
  XMarkIcon,
  CreditCardIcon
} from '@heroicons/react/24/outline';
import { CheckCircleIcon as CheckCircleIconSolid } from '@heroicons/react/24/solid';

const DonationModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [amount, setAmount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // Reset state when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setAmount('');
      setIsProcessing(false);
    }
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;



  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleRazorpay = async () => {
    if (isProcessing) return;
    setIsProcessing(true);
    
    const res = await loadRazorpayScript();
    if (!res) {
      alert('Razorpay SDK failed to load. Are you online?');
      setIsProcessing(false);
      return;
    }

    try {
      // 1. Create order on the backend
      const result = await fetch((process.env.REACT_APP_API_URL || 'https://avyakta-backend.onrender.com') + '/api/payment/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount })
      });

      if (!result.ok) {
        const errorText = await result.text();
        throw new Error(`Server returned ${result.status}: ${errorText.slice(0, 50)}`);
      }
      
      const data = await result.json();

      if (!data.success) {
        alert('Server error. Failed to create payment order.');
        setIsProcessing(false);
        return;
      }

      // 2. Initialize Razorpay Checkout
      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID || 'rzp_test_SoACRQ4kcZ0fM8',
        amount: data.order.amount,
        currency: data.order.currency,
        name: 'Avyakta',
        description: 'Donation for bringing dignity to unclaimed souls',
        order_id: data.order.id,
        handler: async function (response) {
          try {
            // 3. Verify Payment
            const verifyUrl = (process.env.REACT_APP_API_URL || 'https://avyakta-backend.onrender.com') + '/api/payment/verify';
            const verifyData = {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature
            };

            const verifyResult = await fetch(verifyUrl, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(verifyData)
            });
            
            const verifyResponse = await verifyResult.json();
            if (verifyResponse.success) {
              setStep(3); // Go to thank you page
            } else {
              alert('Payment verification failed!');
            }
          } catch (err) {
            alert('Error verifying payment.');
          }
        },
        prefill: {
          name: '',
          email: '',
          contact: ''
        },
        theme: {
          color: '#2E7D9C'
        }
      };

      const paymentObject = new window.Razorpay(options);
      
      paymentObject.on('payment.failed', function (response) {
        console.error(response.error);
        alert(response.error.description);
      });
      
      paymentObject.open();
    } catch (error) {
      console.error('Donation Error:', error);
      alert(`Something went wrong! ${error.message || 'Please check your connection.'}`);
    }
    setIsProcessing(false);
  };

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(
      "I just donated to Avyakta — a portal that helps identify unclaimed bodies and bring dignity to forgotten souls in India. Join me: https://avyakta.org"
    );
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText("https://avyakta.org");
    alert("Link copied to clipboard!");
  };

  return (
    <>
      <div
        className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        style={{
          background: 'rgba(13,33,68,0.7)',
          backdropFilter: 'blur(4px)',
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <div
          className="relative w-full overflow-hidden flex flex-col"
          style={{
            maxWidth: '420px',
            maxHeight: '90vh',
            borderRadius: '16px',
            background: '#FAF7F2',
            boxShadow: '0 24px 80px rgba(0,0,0,0.3)',
            animation: 'modalSlideUp 250ms ease-out forwards',
          }}
        >
          {/* ── HEADER (Same for Step 1 & 2) ── */}
          {step !== 3 && (
            <div style={{ background: '#1B3A6B', padding: '20px 24px' }}>
              <div className="flex justify-between items-start">
                <div>
                  <h2
                    className="font-merriweather font-bold m-0"
                    style={{ color: 'white', fontSize: '1.2rem', lineHeight: '1.3' }}
                  >
                    Support Avyakta
                  </h2>
                  <p
                    style={{
                      color: '#A8C8FF',
                      fontSize: '0.8rem',
                      marginTop: '4px',
                      marginBottom: '0',
                    }}
                  >
                    Every rupee brings dignity to a forgotten soul
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="p-1 rounded-full transition-colors"
                  style={{ color: 'rgba(255,255,255,0.6)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'white')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
                  aria-label="Close"
                >
                  <XMarkIcon style={{ width: '1.4rem', height: '1.4rem' }} />
                </button>
              </div>

              {/* Progress Dots */}
              <div className="flex justify-center gap-2 mt-4">
                {[1, 2, 3].map((dot) => (
                  <div
                    key={dot}
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: dot <= step ? '#2E7D9C' : '#D9CEBC',
                      transition: 'background 0.3s',
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* ── BODY ── */}
          <div className="flex-1 overflow-y-auto relative">
            {/* ════════════════════════════════════════
                STEP 1: IMPACT + AMOUNT
                ════════════════════════════════════════ */}
            {step === 1 && (
              <div className="p-6 flex flex-col h-full">
                {/* Impact Cards */}
                <div className="mb-6">
                  <label
                    style={{
                      display: 'block',
                      fontSize: '0.7rem',
                      color: '#5A7184',
                      letterSpacing: '0.1em',
                      fontWeight: 600,
                      marginBottom: '10px',
                    }}
                  >
                    YOUR DONATION WILL HELP:
                  </label>
                  <div className="flex gap-3 overflow-x-auto pb-2 snap-x hide-scrollbar">
                    {[
                      { val: '200', icon: '🕯️', desc: 'Respectful cremation for one person' },
                      { val: '500', icon: '📋', desc: 'Document & identify one unclaimed case' },
                      { val: '1000', icon: '🌐', desc: 'Support 1 month of our volunteer network' },
                    ].map((card) => {
                      const isSelected = amount === card.val;
                      return (
                        <div
                          key={card.val}
                          onClick={() => setAmount(card.val)}
                          className="snap-start flex-shrink-0 transition-all"
                          style={{
                            width: '140px',
                            background: isSelected ? '#E0F2F8' : 'white',
                            border: isSelected ? '2px solid #2E7D9C' : '1.5px solid #E0D5C5',
                            borderRadius: '10px',
                            padding: '12px 14px',
                            textAlign: 'center',
                            cursor: 'pointer',
                            boxShadow: isSelected ? '0 0 0 3px rgba(46,125,156,0.12)' : 'none',
                          }}
                        >
                          <span style={{ fontSize: '1.3rem', display: 'block', marginBottom: '4px' }}>
                            {card.icon}
                          </span>
                          <div
                            style={{
                              fontWeight: 700,
                              color: isSelected ? '#2E7D9C' : '#1B3A6B',
                              fontSize: '1rem',
                            }}
                          >
                            ₹{card.val}
                          </div>
                          <div
                            style={{
                              fontSize: '0.72rem',
                              color: '#5A7184',
                              lineHeight: '1.3',
                              marginTop: '4px',
                            }}
                          >
                            {card.desc}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Custom Amount */}
                <div className="mb-6">
                  <label
                    style={{
                      display: 'block',
                      fontSize: '0.7rem',
                      color: '#5A7184',
                      letterSpacing: '0.1em',
                      fontWeight: 600,
                      marginBottom: '10px',
                    }}
                  >
                    OR ENTER CUSTOM AMOUNT (₹)
                  </label>
                  <div className="relative">
                    <span
                      className="absolute left-4 top-1/2 transform -translate-y-1/2"
                      style={{ color: '#5A7184', fontWeight: 600, fontSize: '1.1rem' }}
                    >
                      ₹
                    </span>
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="Amount"
                      className="w-full transition-all"
                      style={{
                        border: '2px solid #E0D5C5',
                        borderRadius: '8px',
                        padding: '12px 16px 12px 36px',
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        color: '#1B3A6B',
                        background: 'white',
                        outline: 'none',
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#2E7D9C';
                        e.target.style.boxShadow = '0 0 0 3px rgba(46,125,156,0.15)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#E0D5C5';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                  </div>

                  {/* Trust Signals */}
                  <div
                    className="flex justify-center items-center gap-2 mt-3"
                    style={{ fontSize: '0.72rem', color: '#5A7184' }}
                  >
                    <span className="flex items-center gap-1">
                      <span style={{ color: '#2E7D9C' }}>🔒</span> 100% Secure
                    </span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <span style={{ color: '#2E7D9C' }}>✅</span> Verified NGO
                    </span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <span style={{ color: '#2E7D9C' }}>🧾</span> 80G Tax Benefit
                    </span>
                  </div>
                </div>

                {/* Footer */}
                <div className="mt-auto pt-4">
                  <button
                    disabled={!amount || Number(amount) <= 0}
                    onClick={() => setStep(2)}
                    className="w-full transition-all"
                    style={{
                      background: !amount || Number(amount) <= 0 ? '#D9CEBC' : '#2E7D9C',
                      color: !amount || Number(amount) <= 0 ? '#93AABF' : 'white',
                      padding: '14px',
                      borderRadius: '8px',
                      fontWeight: 700,
                      fontSize: '1rem',
                      border: 'none',
                      cursor: !amount || Number(amount) <= 0 ? 'not-allowed' : 'pointer',
                    }}
                    onMouseEnter={(e) => {
                      if (amount && Number(amount) > 0) {
                        e.currentTarget.style.background = '#1A5F78';
                        e.currentTarget.style.transform = 'translateY(-1px)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (amount && Number(amount) > 0) {
                        e.currentTarget.style.background = '#2E7D9C';
                        e.currentTarget.style.transform = 'translateY(0)';
                      }
                    }}
                  >
                    Continue to Payment →
                  </button>
                </div>
              </div>
            )}

            {/* ════════════════════════════════════════
                STEP 2: PAYMENT METHOD
                ════════════════════════════════════════ */}
            {step === 2 && (
              <div className="p-6">
                <button
                  onClick={() => setStep(1)}
                  style={{
                    color: '#2E7D9C',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    marginBottom: '16px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                  className="hover:underline"
                >
                  ← Back
                </button>

                {/* Highlighted Amount */}
                <div
                  className="mb-6"
                  style={{
                    background: '#E0F2F8',
                    borderRadius: '8px',
                    padding: '12px 16px',
                    textAlign: 'center',
                  }}
                >
                  <div style={{ fontWeight: 700, color: '#1B3A6B', fontSize: '1rem' }}>
                    Donating ₹{amount}
                  </div>
                  <div style={{ color: '#5A7184', fontSize: '0.8rem' }}>
                    Thank you for your generosity 🙏
                  </div>
                </div>

                {/* Main Razorpay Option */}
                <div
                  style={{
                    border: '1.5px solid #E0D5C5',
                    borderRadius: '10px',
                    padding: '20px',
                    background: 'white',
                  }}
                >
                  <div
                    className="flex items-center gap-2 mb-1"
                    style={{ fontWeight: 600, color: '#1B3A6B' }}
                  >
                    <CreditCardIcon className="w-5 h-5 text-blue-600" />
                    Credit / Debit Card / Netbanking
                  </div>
                  <div style={{ color: '#5A7184', fontSize: '0.8rem', marginBottom: '16px' }}>
                    Secure payment via Razorpay
                  </div>

                  <button
                    onClick={handleRazorpay}
                    disabled={isProcessing}
                    className="w-full transition-all"
                    style={{
                      background: isProcessing ? '#93AABF' : '#2E7D9C',
                      color: 'white',
                      borderRadius: '8px',
                      padding: '12px',
                      fontWeight: 700,
                      border: 'none',
                      cursor: isProcessing ? 'not-allowed' : 'pointer',
                    }}
                    onMouseEnter={(e) => {
                      if (!isProcessing) e.currentTarget.style.background = '#1A5F78';
                    }}
                    onMouseLeave={(e) => {
                      if (!isProcessing) e.currentTarget.style.background = '#2E7D9C';
                    }}
                  >
                    {isProcessing ? 'Processing...' : `Pay ₹${amount} with Razorpay`}
                  </button>

                  <div
                    style={{
                      fontSize: '0.72rem',
                      color: '#93AABF',
                      textAlign: 'center',
                      marginTop: '12px',
                    }}
                  >
                    🔒 256-bit SSL encrypted. Your card details are never stored.
                  </div>
                </div>
              </div>
            )}

            {/* ════════════════════════════════════════
                STEP 3: THANK YOU
                ════════════════════════════════════════ */}
            {step === 3 && (
              <div
                className="flex flex-col items-center text-center"
                style={{ background: 'white', padding: '32px 24px', minHeight: '100%' }}
              >
                <div
                  className="flex items-center justify-center mb-5"
                  style={{
                    width: '72px',
                    height: '72px',
                    background: 'linear-gradient(135deg, #2D7A4F, #38A169)',
                    borderRadius: '50%',
                    animation: 'bounceIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
                  }}
                >
                  <CheckCircleIconSolid style={{ color: 'white', width: '40px', height: '40px' }} />
                </div>

                <h2
                  className="font-merriweather"
                  style={{
                    fontWeight: 700,
                    fontSize: '1.3rem',
                    color: '#1B3A6B',
                    marginBottom: '8px',
                  }}
                >
                  Thank You, Friend!
                </h2>

                <div
                  style={{
                    color: '#2E7D9C',
                    fontWeight: 600,
                    fontSize: '1rem',
                  }}
                >
                  Your ₹{amount} donation has been received.
                </div>

                <p
                  style={{
                    color: '#5A7184',
                    fontSize: '0.875rem',
                    lineHeight: '1.6',
                    marginTop: '12px',
                    marginBottom: '20px',
                  }}
                >
                  You've just helped bring dignity to a forgotten soul. Your contribution supports identification, documentation, and respectful last rites for unclaimed individuals.
                </p>

                <div
                  style={{
                    width: '100%',
                    height: '1px',
                    background: '#E0D5C5',
                    margin: '20px 0',
                  }}
                />

                <div style={{ width: '100%' }}>
                  <div style={{ fontSize: '0.8rem', color: '#5A7184', marginBottom: '12px' }}>
                    Spread the word 🙏
                  </div>
                  <div className="flex gap-3 justify-center">
                    <button
                      onClick={handleWhatsAppShare}
                      className="flex-1 transition-all"
                      style={{
                        background: '#25D366',
                        color: 'white',
                        borderRadius: '8px',
                        padding: '10px 16px',
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        border: 'none',
                        cursor: 'pointer',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.filter = 'brightness(0.9)')}
                      onMouseLeave={(e) => (e.currentTarget.style.filter = 'brightness(1)')}
                    >
                      Share on WhatsApp
                    </button>
                    <button
                      onClick={handleCopyLink}
                      className="flex-1 transition-all"
                      style={{
                        background: '#F5F0E8',
                        border: '1px solid #E0D5C5',
                        color: '#1B3A6B',
                        borderRadius: '8px',
                        padding: '10px 16px',
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = '#EBE3D5')}
                      onMouseLeave={(e) => (e.currentTarget.style.background = '#F5F0E8')}
                    >
                      Copy Link
                    </button>
                  </div>
                </div>

                <button
                  onClick={onClose}
                  className="mt-8 transition-colors"
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#5A7184',
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#1B3A6B')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#5A7184')}
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes modalSlideUp {
          from { opacity: 0; transform: scale(0.95) translateY(20px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes bounceIn {
          0% { transform: scale(0); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        input[type=number]::-webkit-inner-spin-button, 
        input[type=number]::-webkit-outer-spin-button { 
          -webkit-appearance: none; 
          margin: 0; 
        }
      `}</style>
    </>
  );
};

export default DonationModal;
