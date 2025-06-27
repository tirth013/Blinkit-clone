import React from "react";
import { FaBolt, FaLeaf, FaTags } from "react-icons/fa";

const Home = () => {
  return (
    <div className="bg-gray-900 min-h-screen pt-8 pb-16 px-4 md:px-0">
      {/* Hero Section */}
      <section className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-16 py-8">
        {/* Text Content */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold text-yellow-400 mb-4">Groceries delivered in minutes</h1>
          <p className="text-lg text-gray-300 mb-6">Experience the fastest delivery of fresh groceries and daily essentials right at your doorstep with Blinkit Clone.</p>
          <button className="bg-yellow-400 text-gray-900 font-bold px-6 py-2 rounded-full shadow hover:bg-yellow-300 transition-colors">Shop Now</button>
        </div>
        {/* Image/Illustration Placeholder */}
        <div className="flex-1 flex justify-center">
          <div className="w-56 h-56 bg-gray-800 rounded-2xl flex items-center justify-center shadow-inner">
            {/* You can replace this with an actual image later */}
            <span className="text-7xl text-yellow-400">🛒</span>
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section className="max-w-4xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="flex flex-col items-center text-center">
          <FaBolt className="text-yellow-400 text-4xl mb-2" />
          <h3 className="text-xl font-semibold text-white mb-1">Super Fast Delivery</h3>
          <p className="text-gray-400 text-sm">Get your groceries delivered in just minutes, anytime you need them.</p>
        </div>
        <div className="flex flex-col items-center text-center">
          <FaLeaf className="text-yellow-400 text-4xl mb-2" />
          <h3 className="text-xl font-semibold text-white mb-1">Fresh Products</h3>
          <p className="text-gray-400 text-sm">We ensure the freshest fruits, vegetables, and daily essentials for you.</p>
        </div>
        <div className="flex flex-col items-center text-center">
          <FaTags className="text-yellow-400 text-4xl mb-2" />
          <h3 className="text-xl font-semibold text-white mb-1">Best Prices</h3>
          <p className="text-gray-400 text-sm">Enjoy amazing deals and discounts on all your favorite products.</p>
        </div>
      </section>
    </div>
  );
};

export default Home;
