import React, { useEffect, useState } from "react";
import banner from "../assets/banner.jpg";
import { useSelector } from "react-redux";
import { valideURLConvert } from "../utils/valideURLConvert";
import { useNavigate } from "react-router-dom";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";

const Home = () => {
  const loadingCategory = useSelector((state) => state.product.loadingCategory);
  const categoryData = useSelector((state) => state.product.allCategory);
  const subCategoryData = useSelector((state) => state.product.allSubCategory);
  const navigate = useNavigate();

  // Product state
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoadingProducts(true);
        const res = await Axios({
          ...SummaryApi.getProduct,
          params: { page: 1, limit: 24 }, // fetch first 24 products
        });
        const { data: responseData } = res;
        if (responseData.success) {
          setProducts(responseData.data);
        }
      } catch (error) {
        AxiosToastError(error);
      } finally {
        setLoadingProducts(false);
      }
    };
    fetchProducts();
  }, []);

  // Handle redirect to product list page for a category
  const handleRedirectProductListpage = (id, cat) => {
    const subcategory = subCategoryData.find((sub) =>
      sub.category.some((c) => c._id === id)
    );
    if (!subcategory) return;
    const url = `/${valideURLConvert(cat)}-${id}/${valideURLConvert(
      subcategory.name
    )}-${subcategory._id}`;
    navigate(url);
  };

  return (
    <section className="bg-white">
      {/* Banner Section */}
      <div className="container mx-auto">
        <div
          className={`w-full min-h-48 bg-blue-100 rounded-2xl shadow overflow-hidden flex items-center justify-center ${
            !banner ? "animate-pulse my-2" : ""
          }`}
        >
          <img
            src={banner}
            className="w-full h-full object-cover"
            alt="banner"
          />
        </div>
      </div>

      {/* Category Grid */}
      {/* <div className="container mx-auto px-4 my-2 grid grid-cols-5 md:grid-cols-8 lg:grid-cols-10 gap-2">
        {loadingCategory
          ? Array.from({ length: 12 }).map((_, index) => (
              <div
                key={index + "loadingcategory"}
                className="bg-white rounded p-4 min-h-36 grid gap-2 shadow animate-pulse"
              >
                <div className="bg-blue-100 min-h-24 rounded"></div>
                <div className="bg-blue-100 h-8 rounded"></div>
              </div>
            ))
          : categoryData.map((cat) => (
              <div
                key={cat._id + "displayCategory"}
                className="w-full h-full cursor-pointer hover:shadow-lg transition rounded-lg bg-white p-2"
                onClick={() => handleRedirectProductListpage(cat._id, cat.name)}
              >
                <div className="aspect-square flex items-center justify-center">
                  <img
                    src={cat.image || "/default-category.png"}
                    className="w-full h-full object-scale-down"
                    alt={cat.name}
                  />
                </div>
              </div>
            ))}
      </div> */}

      {/* Product Grid Section */}
      <div className="container mx-auto px-4 my-8">
        <h2 className="text-xl font-bold mb-2 text-gray-800">All Products</h2>
        {loadingProducts ? (
          <div className="text-gray-500">Loading products...</div>
        ) : products.length === 0 ? (
          <div className="text-gray-400">No products found.</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {products.map((product, idx) => (
              <div
                key={product._id || idx}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200 flex flex-col items-center"
              >
                <div className="h-32 w-full bg-gray-100 flex items-center justify-center">
                  {product.image && product.image.length > 0 ? (
                    <img
                      src={product.image[0]}
                      alt={product.name}
                      className="h-full w-full object-contain"
                    />
                  ) : (
                    <img
                      src="/default-product.png"
                      alt="No Image"
                      className="h-full w-full object-contain opacity-60"
                    />
                  )}
                </div>
                <div className="p-2 w-full text-center">
                  <h3 className="font-semibold text-base text-gray-800 truncate" title={product.name}>
                    {product.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Home;
