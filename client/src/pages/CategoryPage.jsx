import React, { useEffect, useState } from "react";
import UploadCategoryModel from "../components/UploadCategoryModel";
import Loading from "../components/Loading";
import NoData from "../components/NoData";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import EditCategory from "../components/EditCategory";
import ConfirmBox from "../components/ConfirmBox";

const CategoryPage = () => {
  const [openUploadCategory, setOpenUploadCategory] = useState(false);
  const [loading, setLoading] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const [editCategory, setEditCategory] = useState(null);
  const [openConfirmBoxDelete, setOpenConfirmBoxDelete] = useState(false);
  const [deleteCategory, setDeleteCategory] = useState({
    _id: "",
  });

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

  const handleDeleteCategory = async () => {
    try {
      setLoading(true);
      await Axios({
        ...SummaryApi.deleteCategory,
        data: { _id: deleteCategory._id },
        // Axios requires this for DELETE with body
        headers: { "Content-Type": "application/json" },
      });
      setOpenConfirmBoxDelete(false);
      setDeleteCategory({ _id: "" });
      fetchCategory();
    } catch (error) {
      alert(error?.response?.data?.message || "Failed to delete category");
    } finally {
      setLoading(false);
    }
  };

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
                <div className="justify-center gap-2 mt-2 hidden group-hover:flex">
                  <button
                    className="flex items-center gap-1 px-4 py-1 text-xs font-semibold bg-yellow-400 text-black rounded-full shadow hover:bg-yellow-500 transition-colors duration-200 border border-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-300"
                    onClick={() => setEditCategory(category)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 15.828a2 2 0 01-2.828 0L9 13zm-6 6h6"
                      />
                    </svg>
                    Edit
                  </button>
                  <button
                    className="flex items-center gap-1 px-4 py-1 text-xs font-semibold bg-red-500 text-white rounded-full shadow hover:bg-red-600 transition-colors duration-200 border border-red-400 focus:outline-none focus:ring-2 focus:ring-red-300"
                    onClick={() => {
                      setOpenConfirmBoxDelete(true);
                      setDeleteCategory(category)
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                    Delete
                  </button>
                </div>
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
            setEditCategory(null);
          }}
          editData={editCategory}
        />
      )}
      {editCategory && (
        <EditCategory
          editData={editCategory}
          close={() => setEditCategory(null)}
          fetchData={fetchCategory}
        />
      )}
      {openConfirmBoxDelete && (
        <ConfirmBox
          close={() => setOpenConfirmBoxDelete(false)}
          cancel={() => setOpenConfirmBoxDelete(false)}
          confirm={handleDeleteCategory}
        />
      )}
    </section>
  );
};

export default CategoryPage;
