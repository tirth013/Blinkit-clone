import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout as logoutAction } from "../store/userSlice";
import axios from "axios";
import SummaryApi, { baseURL } from "../common/SummaryApi";
import Divider from "./Divider";

const UserMenu = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios({
        method: SummaryApi.logout.method,
        url: baseURL + SummaryApi.logout.url,
        withCredentials: true,
      });
    } catch (err) {
      // Optionally, you can log the error or show a message, but still proceed
    } finally {
      // Always clear local state, even if API call fails
      localStorage.removeItem("isLoggedIn");
      dispatch(logoutAction());
      window.dispatchEvent(new Event("loginStateChange"));
      navigate("/login");
    }
  };

  // Helper for avatar/initials
  const getInitials = (name, email) => {
    if (name) {
      return name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase();
    }
    if (email) return email[0].toUpperCase();
    return "U";
  };

  return (
    <div className="w-64 rounded-lg bg-white text-gray-900 py-2">
      <div className="flex items-center gap-3 px-4 border-b">
        <div>
          <div className="font-extrabold text-lg truncate max-w-[120px] text-gray-900">
            My Account
          </div>
          <div className="text-xs font-semibold text-grey-700 truncate max-w-[180px] py-1 rounded">
            <span> {user.name || user.email || user.mobile}</span>
          </div>
        </div>
      </div>
      <Divider />
      <div className="flex flex-col py-2">
        <Link
          to="/dashboard/profile"
          className="px-4 py-2 hover:bg-gray-100 transition-colors text-sm text-gray-900 text-left font-medium"
        >
          Profile
        </Link>
        <Link
          to="/dashboard/category"
          className="px-4 py-2 hover:bg-gray-100 transition-colors text-sm text-gray-900 text-left font-medium"
        >
          Category
        </Link>
        <Link
          to="/dashboard/subcategory"
          className="px-4 py-2 hover:bg-gray-100 transition-colors text-sm text-gray-900 text-left font-medium"
        >
          Sub Category
        </Link>
        <Link
          to="/dashboard/upload-product"
          className="px-4 py-2 hover:bg-gray-100 transition-colors text-sm text-gray-900 text-left font-medium"
        >
          Upload Product
        </Link>

        <Link
          to="/dashboard/product"
          className="px-4 py-2 hover:bg-gray-100 transition-colors text-sm text-gray-900 text-left font-medium"
        >
          Product
        </Link>
        <Link
          to="/dashboard/myorders"
          className="px-4 py-2 hover:bg-gray-100 transition-colors text-sm text-gray-900 text-left font-medium"
        >
          My Orders
        </Link>
        <Link
          to="/dashboard/address"
          className="px-4 py-2 hover:bg-gray-100 transition-colors text-sm text-gray-900 text-left font-medium"
        >
          Saved Addresses
        </Link>
        <button
          onClick={handleLogout}
          className="px-4 py-2 text-left text-red-600 hover:bg-red-50 transition-colors text-sm mt-1 border-t border-gray-100 font-medium"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserMenu;
