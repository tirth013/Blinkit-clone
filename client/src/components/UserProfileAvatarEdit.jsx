import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import SummaryApi, { baseURL } from '../common/SummaryApi';
import { updatedAvatar } from '../store/userSlice';

const UserProfileAvatarEdit = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef();

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setLoading(true);
    setError("");
    try {
      const formData = new FormData();
      formData.append('avatar', file);
      const res = await axios({
        method: SummaryApi.uploadAvatar.method,
        url: baseURL + SummaryApi.uploadAvatar.url,
        data: formData,
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      if (res.data?.data?.avatar) {
        dispatch(updatedAvatar(res.data.data.avatar));
        fileInputRef.current.value = null;
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to upload avatar.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
      />
      <button
        className="text-sm border border-green-500 text-green-700 px-5 py-1 rounded-full mb-2 hover:bg-green-50 transition font-semibold disabled:opacity-50"
        onClick={handleButtonClick}
        disabled={loading}
      >
        {loading ? 'Uploading...' : 'Edit Photo'}
      </button>
      {error && <div className="text-xs text-red-500 mb-1">{error}</div>}
    </div>
  );
}

export default UserProfileAvatarEdit