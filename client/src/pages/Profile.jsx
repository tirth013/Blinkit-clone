import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaRegUserCircle } from "react-icons/fa";
import Divider from "../components/Divider";
import UserProfileAvatarEdit from "../components/UserProfileAvatarEdit";
import axios from "axios";
import { setUserDetails } from "../store/userSlice";
import SummaryApi, { baseURL } from "../common/SummaryApi";

const Profile = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    name: user.name || "",
    email: user.email || "",
    mobile: user.mobile || "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await axios({
        method: SummaryApi.updateUser.method,
        url: baseURL + SummaryApi.updateUser.url,
        data: form,
        withCredentials: true,
      });
      if (res.data?.success) {
        dispatch(setUserDetails(res.data.data));
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[60vh] bg-gray-200 py-8">
      <div className="bg-[#f9fafb] rounded-xl shadow-lg p-8 w-full max-w-md flex flex-col items-center">
        <div className="w-24 h-24 bg-gray-300 flex items-center justify-center rounded-full drop-shadow mb-4 overflow-hidden">
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={user.name || user.email}
              className="w-full h-full object-cover"
            />
          ) : (
            <FaRegUserCircle size={90} className="text-gray-400" />
          )}
        </div>
        <UserProfileAvatarEdit />
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-1">
            {user.name || "Your Name"}
          </h2>
          <p className="text-gray-900 font-medium text-sm mb-2">
            {user.email || "your@email.com"}
          </p>
          {user.mobile && (
            <p className="text-gray-900 text-sm mb-2">📱 {user.mobile}</p>
          )}
        </div>
        <Divider />
        {/* Profile Edit Form */}
        <form
          className="w-full max-w-sm mt-4 flex flex-col gap-3"
          onSubmit={handleProfileUpdate}
        >
          <input
            type="text"
            className="border rounded font-medium px-3 py-2 text-gray-900"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <input
            type="email"
            className="border rounded font-medium px-3 py-2 text-gray-900"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <input
            type="tel"
            className="border rounded font-medium px-3 py-2 text-gray-900"
            placeholder="Mobile"
            value={form.mobile}
            onChange={(e) => setForm({ ...form, mobile: e.target.value })}
          />
          {error && <div className="text-xs text-red-500">{error}</div>}
          <button
            type="submit"
            className="bg-yellow-500 text-white rounded px-4 py-2 font-semibold hover:bg-yellow-600 transition disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
