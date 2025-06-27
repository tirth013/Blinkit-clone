import React, { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import Search from "../components/Search";
import axios from "axios";
import SummaryApi, { baseURL } from "../common/SummaryApi";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
    <header className="h-20 shadow-md bg-gray-900 text-white flex items-center justify-between px-4 md:px-8 border-b">
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
      {/* Navigation and Cart */}
      <div className="flex items-center gap-6 flex-shrink-0">
        <nav className="hidden md:flex gap-6 font-medium">
          <a href="#" className="hover:text-yellow-400 transition-colors">Home</a>
          <a href="#" className="hover:text-yellow-400 transition-colors">Categories</a>
          <a href="#" className="hover:text-yellow-400 transition-colors">Offers</a>
          {isLoggedIn ? null : (
            <Link to="/login" className="hover:text-yellow-400 transition-colors">Login</Link>
          )}
        </nav>
        <button className="relative text-2xl text-gray-300 hover:text-yellow-400 transition-colors ml-2">
          <FaShoppingCart />
          {/* Cart badge */}
          <span className="absolute -top-2 -right-2 bg-yellow-400 text-gray-900 text-xs rounded-full px-1.5 py-0.5">0</span>
        </button>
        {isLoggedIn && (
          <button
            onClick={handleLogout}
            className="bg-yellow-400 text-gray-900 font-bold px-4 py-1 rounded-full hover:bg-yellow-300 transition-colors ml-4"
          >
            Logout
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
