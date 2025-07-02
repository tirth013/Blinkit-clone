import React, { useState } from "react";
import UploadCategoryModel from "../components/UploadCategoryModel";

const CategoryPage = () => {
  const [openUploadCategory,setOpenUploadCategory] = useState(false)
  return (
    <section className="min-h-[80vh] bg-gray-50 p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4 p-4 bg-white rounded-lg shadow-sm">
        <div className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-yellow-500">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
          </svg>
          <h2 className="text-2xl font-bold text-gray-800">Category</h2>
        </div>
        <button
          onClick={() => { setOpenUploadCategory(true); }}
          className="font-semibold border border-yellow-400 bg-yellow-400 text-black rounded-full px-5 py-2 shadow-md hover:bg-yellow-500 transition-colors duration-200"
        >
          + Add Category
        </button>
      </div>
      <hr className="mb-6 border-gray-200" />
      {
        openUploadCategory && (
          <UploadCategoryModel close={() => { setOpenUploadCategory(false); }} />
        )
      }
    </section>
  );
};

export default CategoryPage;
