import React, { useState, useEffect } from "react";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import uploadImage from "../utils/uploadImage";
import { toast } from "react-hot-toast";

const UploadProduct = () => {
  const [data, setData] = useState({
    name: "",
    image: [],
    category: [],
    subCategory: [],
    unit: "",
    stock: "",
    price: "",
    discount: "",
    description: "",
    more_details: {},
  });
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [moreDetailsList, setMoreDetailsList] = useState([]);

  useEffect(() => {
    // Fetch categories and subcategories
    const fetchData = async () => {
      try {
        const catRes = await Axios(SummaryApi.getCategory);
        setCategories(catRes.data.data || []);
        const subCatRes = await Axios(SummaryApi.getSubCategory);
        setSubCategories(subCatRes.data.data || []);
      } catch (err) {
        setCategories([]);
        setSubCategories([]);
      }
    };
    fetchData();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, multiple, options } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  // Handle image file input
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles(files);
    setImagePreviews(files.map(file => URL.createObjectURL(file)));
    e.target.value = "";
  };

  // Cleanup image previews on unmount
  useEffect(() => {
    return () => {
      imagePreviews.forEach(url => URL.revokeObjectURL(url));
    };
  }, []);

  // Handle more_details dynamic fields
  const handleMoreDetailChange = (idx, field, value) => {
    setMoreDetailsList(list => {
      const newList = [...list];
      newList[idx] = { ...newList[idx], [field]: value };
      return newList;
    });
  };
  const addMoreDetail = () => setMoreDetailsList(list => [...list, { key: "", value: "" }]);
  const removeMoreDetail = (idx) => setMoreDetailsList(list => list.filter((_, i) => i !== idx));

  // Remove image from preview and files
  const handleRemoveImage = (idx) => {
    setImageFiles(prev => prev.filter((_, i) => i !== idx));
    setImagePreviews(prev => {
      const newPreviews = prev.filter((_, i) => i !== idx);
      // Cleanup the removed URL
      if (prev[idx]) {
        URL.revokeObjectURL(prev[idx]);
      }
      return newPreviews;
    });
  };

  // On submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Debug logging
    console.log("Image files:", imageFiles);
    console.log("Image files length:", imageFiles.length);
    console.log("Image previews:", imagePreviews);
    console.log("Image previews length:", imagePreviews.length);
    
    // Validate required fields
    if (!data.name.trim()) {
      toast.error("Product name is required");
      return;
    }
    if (imageFiles.length === 0 && imagePreviews.length === 0) {
      toast.error(`At least one image is required. Current: ${imageFiles.length} files, ${imagePreviews.length} previews`);
      return;
    }
    if (data.category.length === 0) {
      toast.error("At least one category is required");
      return;
    }
    if (data.subCategory.length === 0) {
      toast.error("At least one subcategory is required");
      return;
    }
    if (!data.unit.trim()) {
      toast.error("Unit is required");
      return;
    }
    if (!data.stock || data.stock <= 0) {
      toast.error("Valid stock quantity is required");
      return;
    }
    if (!data.price || data.price <= 0) {
      toast.error("Valid price is required");
      return;
    }
    if (!data.description.trim()) {
      toast.error("Description is required");
      return;
    }
    
    setLoading(true);
    try {
      // Upload images
      let uploadedImages = [];
      for (let file of imageFiles) {
        const res = await uploadImage(file);
        if (res.data && res.data.image) uploadedImages.push(res.data.image);
      }
      // Prepare more_details object
      const moreDetailsObj = {};
      moreDetailsList.forEach(({ key, value }) => {
        if (key) moreDetailsObj[key] = value;
      });
      // Prepare payload
      const payload = {
        ...data,
        image: uploadedImages,
        more_details: moreDetailsObj,
        stock: Number(data.stock),
        price: Number(data.price),
        discount: Number(data.discount) || 0,
      };
      // Send to backend
      await Axios.post(SummaryApi.addProduct.url, payload);
      toast.success("Product uploaded");
      setData({
        name: "",
        image: [],
        category: [],
        subCategory: [],
        unit: "",
        stock: "",
        price: "",
        discount: "",
        description: "",
        more_details: {},
      });
      setImageFiles([]);
      setImagePreviews([]);
      setMoreDetailsList([]);
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || "Failed to upload product");
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
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
          </svg>
          <h2 className="text-2xl font-bold text-gray-800">Upload Product</h2>
        </div>
      </div>
      <div className="grid p-3">
        <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
          <div className="grid gap-1">
            <label htmlFor="name" className="font-sans">Name</label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="Enter product name"
              value={data.name}
              onChange={handleChange}
              className="font-sans bg-blue-50 p-2 outline-none border focus-within:border-yellow-500 rounded"
              required
            />
          </div>
          <div className="grid gap-1">
            <label className="font-sans">Images</label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              className="font-sans bg-blue-50 p-2 outline-none border focus-within:border-yellow-500 rounded"
              required
            />
            {imageFiles.length > 0 && (
              <div className="text-sm text-green-600 font-medium">
                {imageFiles.length} image(s) selected
              </div>
            )}
            <div className="flex gap-2 mt-2">
              {imagePreviews.map((src, i) => (
                <div key={i} className="relative inline-block">
                  <img src={src} alt="preview" className="h-16 w-16 object-cover rounded border" />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(i)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white w-3 h-3 flex items-center justify-center text-xs shadow hover:bg-red-600"
                    title="Remove image"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="grid gap-1">
            <label className="font-sans">Category</label>
            <select
              name="category"
              value={data.category}
              onChange={handleChange}
              className="font-sans bg-blue-50 p-2 outline-none border focus-within:border-yellow-500 rounded"
              required
            >
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>{cat.name}</option>
              ))}
            </select>
          </div>
          <div className="grid gap-1">
            <label className="font-sans">Sub Category</label>
            <select
              name="subCategory"
              value={data.subCategory}
              onChange={handleChange}
              className="font-sans bg-blue-50 p-2 outline-none border focus-within:border-yellow-500 rounded"
              required
            >
              {subCategories.map((sub) => (
                <option key={sub._id} value={sub._id}>{sub.name}</option>
              ))}
            </select>
          </div>
          <div className="grid gap-1">
            <label className="font-sans">Unit</label>
            <input
              type="text"
              name="unit"
              value={data.unit}
              onChange={handleChange}
              className="font-sans bg-blue-50 p-2 outline-none border focus-within:border-yellow-500 rounded"
              placeholder="e.g. kg, g, l, ml, pcs, pack, dozen"
              required
            />
          </div>
          <div className="grid gap-1">
            <label className="font-sans">Stock</label>
            <input
              type="number"
              name="stock"
              value={data.stock}
              onChange={handleChange}
              className="font-sans bg-blue-50 p-2 outline-none border focus-within:border-yellow-500 rounded"
              required
              min={0}
            />
          </div>
          <div className="grid gap-1">
            <label className="font-sans">Price</label>
            <input
              type="number"
              name="price"
              value={data.price}
              onChange={handleChange}
              className="font-sans bg-blue-50 p-2 outline-none border focus-within:border-yellow-500 rounded"
              required
              min={0}
            />
          </div>
          <div className="grid gap-1">
            <label className="font-sans">Discount (%)</label>
            <input
              type="number"
              name="discount"
              value={data.discount}
              onChange={handleChange}
              className="font-sans bg-blue-50 p-2 outline-none border focus-within:border-yellow-500 rounded"
              min={0}
              max={100}
            />
          </div>
          <div className="grid gap-1">
            <label className="font-sans">Description</label>
            <textarea
              name="description"
              value={data.description}
              onChange={handleChange}
              className="font-sans bg-blue-50 p-2 outline-none border focus-within:border-yellow-500 rounded"
              rows={3}
              required
            />
          </div>
          <div className="grid gap-1">
            <label className="font-sans">More Details</label>
            {moreDetailsList.map((item, idx) => (
              <div key={idx} className="flex gap-2 mb-1">
                <input
                  type="text"
                  placeholder="Key"
                  value={item.key}
                  onChange={e => handleMoreDetailChange(idx, "key", e.target.value)}
                  className="font-sans bg-blue-50 p-2 outline-none border focus-within:border-yellow-500 rounded flex-1"
                />
                <input
                  type="text"
                  placeholder="Value"
                  value={item.value}
                  onChange={e => handleMoreDetailChange(idx, "value", e.target.value)}
                  className="font-sans bg-blue-50 p-2 outline-none border focus-within:border-yellow-500 rounded flex-1"
                />
                <button type="button" onClick={() => removeMoreDetail(idx)} className="text-red-500 font-bold px-2">&times;</button>
              </div>
            ))}
            <button type="button" onClick={addMoreDetail} className="text-yellow-600 font-semibold mt-1">+ Add Detail</button>
          </div>
          <button
            type="submit"
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 rounded-lg shadow transition-colors duration-200 mt-2"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Product"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default UploadProduct;
