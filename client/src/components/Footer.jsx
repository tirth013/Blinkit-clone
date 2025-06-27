import React from "react";
import { FaFacebook } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white border-t p-0 mt-8">
      <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Branding */}
        <div className="flex flex-col items-center md:items-start">
          <span className="text-xl font-bold tracking-wide">Blinkit Clone</span>
          <span className="text-sm text-gray-400">Groceries delivered in minutes</span>
        </div>
        {/* Social Icons */}
        <div className="flex items-center gap-4">
          <a href="#" className="hover:text-yellow-400 transition-colors text-2xl" aria-label="Facebook"><FaFacebook /></a>
          <a href="#" className="hover:text-pink-400 transition-colors text-2xl" aria-label="Instagram"><FaInstagram /></a>
          <a href="#" className="hover:text-blue-400 transition-colors text-2xl" aria-label="LinkedIn"><FaLinkedinIn /></a>
        </div>
        {/* Copyright */}
        <div className="text-xs text-gray-400 text-center md:text-right">
          © {new Date().getFullYear()} Blinkit Clone. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
