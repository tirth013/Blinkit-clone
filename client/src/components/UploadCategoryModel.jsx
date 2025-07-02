import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import axios from "axios";
import SummaryApi, { baseURL } from "../common/SummaryApi";

const UploadCategoryModel = ({ close }) => {
  const [data, setData] = useState({
    name: "",
    image: null,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
    setError("");
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("image", data.image);
      await axios.post(
        baseURL + SummaryApi.addCategory.url,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      setLoading(false);
      close();
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || "Failed to upload category");
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
          {error && <div className="text-red-500 text-sm">{error}</div>}
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
