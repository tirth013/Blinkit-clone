import React, { useEffect } from 'react';
import axios from 'axios';
import SummaryApi, { baseURL } from '../common/SummaryApi';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const logoutUser = async () => {
      try {
        await axios({
          method: SummaryApi.logout.method,
          url: baseURL + SummaryApi.logout.url,
          withCredentials: true,
        });
      } catch (err) {
        // Optionally handle error
      } finally {
        navigate('/login');
      }
    };
    logoutUser();
  }, [navigate]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-md text-center">
        <h2 className="text-2xl font-bold text-yellow-400 mb-4">Logging out...</h2>
      </div>
    </div>
  );
};

export default Logout;
