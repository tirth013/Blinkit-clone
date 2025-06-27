import React, { useState, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import SummaryApi, { baseURL } from '../common/SummaryApi';

const OTP_LENGTH = 6;

const OtpVerification = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const emailFromState = location.state?.email || '';
  const [email] = useState(emailFromState);
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(''));
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const inputsRef = useRef([]);

  const handleChange = (e, idx) => {
    const val = e.target.value.replace(/[^0-9]/g, '');
    if (!val) return;
    const newOtp = [...otp];
    newOtp[idx] = val[val.length - 1];
    setOtp(newOtp);
    if (idx < OTP_LENGTH - 1 && val) {
      inputsRef.current[idx + 1].focus();
    }
  };

  const handleKeyDown = (e, idx) => {
    if (e.key === 'Backspace') {
      if (otp[idx]) {
        const newOtp = [...otp];
        newOtp[idx] = '';
        setOtp(newOtp);
      } else if (idx > 0) {
        inputsRef.current[idx - 1].focus();
      }
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData('text').replace(/[^0-9]/g, '').slice(0, OTP_LENGTH);
    if (paste.length === OTP_LENGTH) {
      setOtp(paste.split(''));
      inputsRef.current[OTP_LENGTH - 1].focus();
    }
    e.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    const otpValue = otp.join('');
    if (!email || otpValue.length !== OTP_LENGTH) {
      setError('Please enter the 6-digit OTP');
      return;
    }
    setLoading(true);
    try {
      await axios({
        method: SummaryApi.verify_forgot_password_otp.method,
        url: baseURL + SummaryApi.verify_forgot_password_otp.url,
        data: { email, otp: otpValue },
      });
      setSuccess('Code verified');
      setTimeout(() => {
        navigate('/reset-password', { state: { email } });
      }, 1200);
    } catch (err) {
      setError(
        err.response?.data?.message || 'OTP verification failed. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-900 py-8">
      <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-yellow-400 mb-6 text-center">OTP Verification</h2>
        <p className="text-gray-300 text-center mb-6">
          Enter the code sent to <span className="font-semibold">{email}</span> to reset your password.
        </p>
        {error && <p className="text-red-400 text-center mb-4 text-sm">{error}</p>}
        {success && (
          <div className="flex items-center justify-center mb-4">
            <span className="text-green-400 mr-2 text-lg">✔</span>
            <span className="text-green-400 text-sm">{success}</span>
          </div>
        )}
        <div className="flex justify-center mb-6 gap-2" onPaste={handlePaste}>
          {otp.map((digit, idx) => (
            <input
              key={idx}
              ref={el => (inputsRef.current[idx] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={e => handleChange(e, idx)}
              onKeyDown={e => handleKeyDown(e, idx)}
              className="w-12 h-12 text-2xl text-center rounded-lg border-2 border-yellow-400 bg-gray-700 text-white focus:ring-2 focus:ring-yellow-400 outline-none transition-all"
              disabled={loading}
              autoFocus={idx === 0}
            />
          ))}
        </div>
        <button
          type="submit"
          className="w-full bg-yellow-400 text-gray-900 font-bold py-2 rounded-full hover:bg-yellow-300 transition-colors"
          disabled={loading}
        >
          {loading ? 'Verifying...' : 'Verify OTP'}
        </button>
        <div className="mt-6 text-center">
          <span className="text-gray-300 text-sm">Already have account? </span>
          <Link to="/login" className="text-yellow-400 hover:underline text-sm">Login</Link>
        </div>
      </form>
    </div>
  );
};

export default OtpVerification;
