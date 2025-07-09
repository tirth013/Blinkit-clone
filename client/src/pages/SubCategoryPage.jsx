import React, { useState, useEffect } from "react";
import NoData from "../components/NoData";
import Loading from "../components/Loading";
import UploadSubCategoryModel from "../components/UploadSubCategoryModel";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import { toast } from "react-hot-toast";
import ConfirmBox from "../components/ConfirmBox";

const SubCategoryPage = () => {
  const [openUploadSubCategory, setOpenUploadSubCategory] = useState(false);
  const [editSubCategory, setEditSubCategory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [subCategoryData, setSubCategoryData] = useState([]);
  const [error, setError] = useState("");
  const [openConfirmBoxDelete, setOpenConfirmBoxDelete] = useState(false);
  const [deleteSubCategory, setDeleteSubCategory] = useState(null);

  const fetchSubCategory = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await Axios(SummaryApi.getSubCategory);
      setSubCategoryData(res.data.data || []);
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Failed to fetch subcategories");
      setSubCategoryData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubCategory();
  }, []);

  const requestDelete = (subCat) => {
    setDeleteSubCategory(subCat);
    setOpenConfirmBoxDelete(true);
  };

  const handleDelete = async () => {
    if (!deleteSubCategory) return;
    setLoading(true);
    try {
      await Axios({
        ...SummaryApi.deleteSubCategory,
        data: { _id: deleteSubCategory._id },
        headers: { "Content-Type": "application/json" },
      });
      toast.success("Subcategory deleted");
      fetchSubCategory();
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || "Failed to delete subcategory");
    } finally {
      setLoading(false);
      setOpenConfirmBoxDelete(false);
      setDeleteSubCategory(null);
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
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
          </svg>
          <h2 className="text-2xl font-bold text-gray-800">Sub Category</h2>
        </div>
        <button
          onClick={() => {
            setOpenUploadSubCategory(true);
            setEditSubCategory(null);
          }}
          className="font-semibold border border-yellow-400 bg-yellow-400 text-black rounded-full px-5 py-2 shadow-md hover:bg-yellow-500 transition-colors duration-200"
        >
          + Add Sub Category
        </button>
      </div>
      {error && <div className="text-red-500 text-center mb-4">{error}</div>}
      {loading && <Loading />}
      {/* Subcategory Table */}
      {subCategoryData.length > 0 ? (
        <div className="overflow-x-auto mt-6">
          <table className="min-w-full border border-gray-200 bg-white rounded-lg shadow">
            <thead>
              <tr>
                <th className="px-4 py-2 bg-black text-white font-bold border">Sr.No</th>
                <th className="px-4 py-2 bg-black text-white font-bold border">Name</th>
                <th className="px-4 py-2 bg-black text-white font-bold border">Image</th>
                <th className="px-4 py-2 bg-black text-white font-bold border">Category</th>
                <th className="px-4 py-2 bg-black text-white font-bold border">Action</th>
              </tr>
            </thead>
            <tbody>
              {subCategoryData.map((subCat, idx) => (
                <tr key={subCat._id || idx} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2 text-center border font-sans">{idx + 1}</td>
                  <td className="px-4 py-2 border font-sans">{subCat.name}</td>
                  <td className="px-4 py-2 border text-center">
                    <img src={subCat.image} alt={subCat.name} className="h-10 w-10 object-contain mx-auto" />
                  </td>
                  <td className="px-4 py-2 border">
                    <span className="bg-white shadow px-2 py-1 rounded text-gray-800 text-sm font-medium">
                      {subCat.category?.name || "No Category"}
                    </span>
                  </td>
                  <td className="px-4 py-2 border text-center">
                    <button
                      className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-green-100 hover:bg-green-200 mr-2"
                      title="Edit"
                      onClick={() => {
                        setEditSubCategory(subCat);
                        setOpenUploadSubCategory(true);
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 15.828a2 2 0 01-2.828 0L9 13zm-6 6h6" />
                      </svg>
                    </button>
                    <button
                      className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-red-100 hover:bg-red-200"
                      title="Delete"
                      onClick={() => requestDelete(subCat)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        !loading && <NoData />
      )}
      {/* End Table */}
      <hr className="mb-6 border-gray-200" />
      {openUploadSubCategory && (
        <UploadSubCategoryModel
          fetchData={fetchSubCategory}
          close={() => {
            setOpenUploadSubCategory(false);
            setEditSubCategory(null);
          }}
          editData={editSubCategory}
        />
      )}
      {openConfirmBoxDelete && (
        <ConfirmBox
          close={() => {
            setOpenConfirmBoxDelete(false);
            setDeleteSubCategory(null);
          }}
          cancel={() => {
            setOpenConfirmBoxDelete(false);
            setDeleteSubCategory(null);
          }}
          confirm={handleDelete}
        />
      )}
    </section>
  );
};

export default SubCategoryPage;
