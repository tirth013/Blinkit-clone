import React, { useEffect, useState } from "react";
import UploadCategoryModel from "../components/UploadCategoryModel";
import Loading from "../components/Loading";
import NoData from "../components/NoData";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";

const CategoryPage = () => {
  const [openUploadCategory, setOpenUploadCategory] = useState(false);
  const [loading, setLoading] = useState(false);
  const [categoryData, setCategoryData] = useState([]);

  const fetchCategory = async () => {
    try {
      setLoading(true);
      const res = await Axios({
        ...SummaryApi.getCategory,
      });
      const { data: responseData } = res;
      if (responseData.success) {
        setCategoryData(responseData.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchCategory();
  }, []);

  return (
    <section className="min-h-[80vh] bg-gray-50 p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4 p-4 bg-white rounded-lg shadow-sm">
        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-7 h-7 text-yellow-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6v6l4 2"
            />
          </svg>
          <h2 className="text-2xl font-bold text-gray-800">Category</h2>
        </div>
        <button
          onClick={() => {
            setOpenUploadCategory(true);
          }}
          className="font-semibold border border-yellow-400 bg-yellow-400 text-black rounded-full px-5 py-2 shadow-md hover:bg-yellow-500 transition-colors duration-200"
        >
          + Add Category
        </button>
      </div>
      {!categoryData[0] && !loading && <NoData />}
      {/* Category Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-6">
        {categoryData.map((category, idx) => {
          return (
            <div
              key={category._id || idx}
              className="flex flex-col items-center justify-between w-full h-64 bg-[#ecf4ff] rounded-xl shadow hover:shadow-lg transition-shadow duration-200 overflow-hidden group cursor-pointer border border-blue-100"
            >
              <div className="flex-1 flex items-center justify-center w-full p-4">
                <img
                  src={category.image}
                  alt={category.name}
                  className="max-h-32 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
                />
              </div>
              <div className="w-full bg-white py-2 px-3 text-center border-t border-blue-100">
                <span
                  className="block text-base font-semibold text-gray-800 truncate"
                  title={category.name}
                >
                  {category.name}
                </span>
              </div>
            </div>
          );
        })}
      </div>
      {loading && <Loading />}

      <hr className="mb-6 border-gray-200" />
      {openUploadCategory && (
        <UploadCategoryModel
          fetchData={fetchCategory}
          close={() => {
            setOpenUploadCategory(false);
          }}
        />
      )}
    </section>
  );
};

export default CategoryPage;
