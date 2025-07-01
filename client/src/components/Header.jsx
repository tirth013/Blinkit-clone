import React, { useEffect, useState } from "react";
import { FaShoppingCart, FaChevronDown } from "react-icons/fa";
import Search from "../components/Search";
import axios from "axios";
import SummaryApi, { baseURL } from "../common/SummaryApi";
import { Link, useNavigate } from "react-router-dom";
import UserMenu from "./userMenu.jsx";

const Header = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);

  useEffect(() => {
    // Check login state from localStorage
    setIsLoggedIn(!!localStorage.getItem("isLoggedIn"));
    // Listen for login/logout changes from other tabs or custom event
    const handleStorage = () => setIsLoggedIn(!!localStorage.getItem("isLoggedIn"));
    window.addEventListener("storage", handleStorage);
    window.addEventListener("loginStateChange", handleStorage);
    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("loginStateChange", handleStorage);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await axios({
        method: SummaryApi.logout.method,
        url: baseURL + SummaryApi.logout.url,
        withCredentials: true,
      });
      localStorage.removeItem("isLoggedIn");
      setIsLoggedIn(false);
      navigate("/login");
    } catch (err) {
      alert("Logout failed. Please try again.");
    }
  };

  return (
    <header className="h-20 shadow bg-white text-gray-900 flex items-center justify-between w-full px-6 border-b border-gray-200" style={{ background: 'white' }}>
      {/* Logo/Brand */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <Link to="/">
          <img src="/blinkit-logo.svg" alt="Blinkit Logo" className="h-14 w-auto" />
        </Link>
      </div>
      {/* Search Bar */}
      <div className="flex-1 flex justify-center mx-4">
        <Search />
      </div>
      {/* Account & Cart */}
      <div className="flex items-center gap-6 flex-shrink-0 relative">
        {/* Account Dropdown */}
        <div className="relative">
          <button
            className="flex items-center gap-1 px-4 py-2 rounded hover:bg-[rgb(229,236,245)] text-gray-900 transition-colors focus:outline-none border border-gray-200"
            onClick={() => setAccountOpen((prev) => !prev)}
            onBlur={() => setTimeout(() => setAccountOpen(false), 150)}
            tabIndex={0}
          >
            <span className="font-medium">Account</span>
            <FaChevronDown className="text-xs mt-0.5" />
          </button>
          {accountOpen && (
            <div className="absolute left-0 mt-2 w-30 bg-white rounded shadow-lg z-20 animate-fade-in border border-gray-200">
              <UserMenu />
            </div>
          )}
        </div>
        {/* My Cart Button */}
        <Link to="/cart" className="relative flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded shadow transition-colors">
          <FaShoppingCart className="text-lg" />
          <span>My Cart</span>
          <span className="absolute -top-2 -right-2 bg-yellow-400 text-gray-900 text-xs rounded-full px-1.5 py-0.5 border-2 border-white">0</span>
        </Link>
      </div>
    </header>
  );
};

export default Header;
