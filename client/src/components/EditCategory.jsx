import React, { useState } from "react";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import Loading from "./Loading";
import uploadImage from "../utils/uploadImage";

const EditCategory = ({ editData, close, fetchData }) => {
  const [name, setName] = useState(editData?.name || "");
  const [image, setImage] = useState(editData?.image || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploading(true);
      setError("");
      try {
        const res = await uploadImage(file);
        setImage(res.data.image); // <-- Only set the image URL string
      } catch (err) {
        setError("Failed to upload image.");
      } finally {
        setUploading(false);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!name || !image) {
      setError("Both name and image are required.");
      return;
    }
    setLoading(true);
    try {
      const res = await Axios({
        ...SummaryApi.updateCategory,
        data: {
          categoryId: editData._id,
          name,
          image,
        },
      });
      if (res.data.success) {
        fetchData();
        close();
      } else {
        setError(res.data.message || "Failed to update category.");
      }
    } catch (err) {
      setError("An error occurred while updating the category.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-xl font-bold mb-4 text-gray-800">Edit Category</h2>
        {error && <div className="mb-2 text-red-500">{error}</div>}
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Name</label>
          <input
            type="text"
            value={name}
            className="w-full px-3 py-2bg-blue-50 p-2 border border-blue-100 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 outline-none rounded transition-all font-light"
            onChange={(e) => setName(e.target.value)}
            placeholder="Category Name"
            disabled={loading || uploading}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Image</label>
          <div className="flex items-center gap-4">
            {image && (
              <img
                src={image}
                alt="Category"
                className="w-16 h-16 object-cover rounded border"
              />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="font-sans bg-blue-50 p-2 border border-blue-100 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 outline-none rounded transition-all"
              disabled={loading || uploading}
            />
            {uploading && <Loading small />}
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <button
            type="button"
            className="font-medium px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
            onClick={close}
            disabled={loading || uploading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded bg-yellow-400 text-black font-semibold hover:bg-yellow-500"
            disabled={loading || uploading}
          >
            {loading ? <Loading small /> : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditCategory;
