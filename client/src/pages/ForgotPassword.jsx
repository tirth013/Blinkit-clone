import React, { useState } from 'react';
import axios from 'axios';
import SummaryApi, { baseURL } from '../common/SummaryApi';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!email) {
      setError('Email is required');
      return;
    }
    setLoading(true);
    try {
      await axios({
        method: SummaryApi.forgot_password.method,
        url: baseURL + SummaryApi.forgot_password.url,
        data: { email },
      });
      setSuccess('If this email is registered, you will receive password reset instructions.');
      setTimeout(() => {
        navigate('/otp-verification', { state: { email } });
      }, 1000);
    } catch (err) {
      setError(
        err.response?.data?.message || 'Failed to send reset instructions. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-900 py-8">
      <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-yellow-400 mb-6 text-center">Forgot Password</h2>
        {error && <p className="text-red-400 text-center mb-4 text-sm">{error}</p>}
        {success && <p className="text-green-400 text-center mb-4 text-sm">{success}</p>}
        <div className="mb-6">
          <label className="block text-gray-300 mb-1" htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full px-3 py-2 rounded bg-gray-700 text-white outline-none focus:ring-2 focus:ring-yellow-400"
            autoComplete="email"
          />
        </div>
        <button type="submit" className="w-full bg-yellow-400 text-gray-900 font-bold py-2 rounded-full hover:bg-yellow-300 transition-colors" disabled={loading}>
          {loading ? 'Sending...' : 'Send OTP'}
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
