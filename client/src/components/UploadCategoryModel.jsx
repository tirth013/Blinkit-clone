import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import Axios from "../utils/Axios";
import SummaryApi, { baseURL } from "../common/SummaryApi";
import uploadImage from "../utils/uploadImage";
import { toast } from "react-hot-toast";

const UploadCategoryModel = ({ close,fetchData }) => {
  const [data, setData] = useState({
    name: "",
    image: null,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleOnChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      const file = files[0];
      setData((preve) => ({
        ...preve,
        image: file,
      }));
      if (file) {
        setImagePreview(URL.createObjectURL(file));
      } else {
        setImagePreview(null);
      }
    } else {
      setData((preve) => ({
        ...preve,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const toastId = toast.loading("Uploading category...");
    try {
      // 1. Upload the image using the utility function
      const uploadRes = await uploadImage(data.image);
      if (!uploadRes.data || !uploadRes.data.image) {
        throw new Error(uploadRes.response?.data?.message || "Image upload failed");
      }
      const imageString = uploadRes.data.image;

      // 2. Add the category
      await Axios.post(
        SummaryApi.addCategory.url,
        { name: data.name, image: imageString }
      );

      setLoading(false);
      toast.success("Category added successfully!", { id: toastId });
      setData({ name: "", image: null });
      setImagePreview(null);
      close();
      fetchData()
    } catch (err) {
      setLoading(false);
      toast.error(err.response?.data?.message || err.message || "Failed to upload category", { id: toastId });
    }
  };

  return (
    <section className="fixed top-0 left-0 w-full h-full bg-neutral-800 bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-white max-w-md w-full p-6 rounded-xl shadow-2xl relative animate-fadeIn">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold text-gray-800">Add Category</h1>
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
            <label
              htmlFor="categoryName"
              className="text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="categoryName"
              placeholder="Enter category name"
              value={data.name}
              name="name"
              onChange={handleOnChange}
              className="bg-blue-50 p-2 border border-blue-100 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 outline-none rounded transition-all font-medium"
              autoFocus
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label
              htmlFor="categoryImage"
              className="text-sm font-medium text-gray-700"
            >
              Image
            </label>
            <input
              disabled = {!data.name}
              type="file"
              id="categoryImage"
              name="image"
              accept="image/*"
              onChange={handleOnChange}
              className="font-sans bg-blue-50 p-2 border border-blue-100 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 outline-none rounded transition-all"
              required
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
            {loading ? "Saving..." : "Save Category"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default UploadCategoryModel;
