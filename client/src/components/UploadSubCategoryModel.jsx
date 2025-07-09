import React, { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import uploadImage from "../utils/uploadImage";
import { toast } from "react-hot-toast";

const UploadSubCategoryModel = ({ close, fetchData, editData }) => {
  const [data, setData] = useState({
    name: editData?.name || "",
    image: null,
    category: editData?.category?.[0]?._id || "",
  });
  const [imagePreview, setImagePreview] = useState(editData?.image || null);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch categories for dropdown
    const fetchCategories = async () => {
      try {
        const res = await Axios(SummaryApi.getCategory);
        setCategories(res.data.data || []);
      } catch (err) {
        setCategories([]);
      }
    };
    fetchCategories();
  }, []);

  const handleOnChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      const file = files[0];
      setData((prev) => ({ ...prev, image: file }));
      if (file) {
        setImagePreview(URL.createObjectURL(file));
      } else {
        setImagePreview(null);
      }
    } else {
      setData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const toastId = toast.loading(editData ? "Updating subcategory..." : "Uploading subcategory...");
    try {
      let imageString = editData?.image;
      if (data.image && typeof data.image !== "string") {
        // Only upload if new file selected
        const uploadRes = await uploadImage(data.image);
        if (!uploadRes.data || !uploadRes.data.image) {
          throw new Error(uploadRes.response?.data?.message || "Image upload failed");
        }
        imageString = uploadRes.data.image;
      }
      if (editData) {
        // Update
        await Axios.put(
          SummaryApi.updateSubCategory.url,
          { _id: editData._id, name: data.name, image: imageString, category: data.category }
        );
        toast.success("Subcategory updated!", { id: toastId });
      } else {
        // Add
        await Axios.post(
          SummaryApi.addSubCategory.url,
          { name: data.name, image: imageString, category: data.category }
        );
        toast.success("Subcategory added!", { id: toastId });
      }
      setLoading(false);
      setData({ name: "", image: null, category: "" });
      setImagePreview(null);
      close();
      fetchData();
    } catch (err) {
      setLoading(false);
      toast.error(err.response?.data?.message || err.message || "Failed to upload subcategory", { id: toastId });
    }
  };

  return (
    <section className="fixed top-0 left-0 w-full h-full bg-neutral-800 bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-white max-w-md w-full p-6 rounded-xl shadow-2xl relative animate-fadeIn">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold text-gray-800">{editData ? "Edit" : "Add"} Subcategory</h1>
          <button
            onClick={close}
            className="text-gray-500 hover:text-red-500 transition-colors"
            aria-label="Close modal"
          >
            <IoClose size={28} />
          </button>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="flex flex-col gap-1">
            <label htmlFor="subcategoryName" className="text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              id="subcategoryName"
              placeholder="Enter subcategory name"
              value={data.name}
              name="name"
              onChange={handleOnChange}
              className="bg-blue-50 p-2 border border-blue-100 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 outline-none rounded transition-all font-medium"
              autoFocus
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="subcategoryCategory" className="text-sm font-medium text-gray-700">Category</label>
            <select
              id="subcategoryCategory"
              name="category"
              value={data.category}
              onChange={handleOnChange}
              className="bg-blue-50 p-2 border border-blue-100 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 outline-none rounded transition-all font-medium"
              required
            >
              <option value="" disabled>Select category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>{cat.name}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="subcategoryImage" className="text-sm font-medium text-gray-700">Image</label>
            <input
              disabled={!data.name || !data.category}
              type="file"
              id="subcategoryImage"
              name="image"
              accept="image/*"
              onChange={handleOnChange}
              className="font-sans bg-blue-50 p-2 border border-blue-100 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 outline-none rounded transition-all"
              required={!editData}
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="mt-2 h-24 w-24 object-cover rounded border border-gray-200"
              />
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 rounded-lg shadow transition-colors duration-200 mt-2"
            disabled={loading}
          >
            {loading ? (editData ? "Saving..." : "Saving...") : (editData ? "Save Changes" : "Save Subcategory")}
          </button>
        </form>
      </div>
    </section>
  );
};

export default UploadSubCategoryModel;
