import React, { useEffect, useState } from "react";
import banner from "../assets/banner.jpg";
import { useSelector } from "react-redux";
import { valideURLConvert } from "../utils/valideURLConvert";
import { useNavigate } from "react-router-dom";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import CategoryWiseProductDisplay from "../components/CategoryWiseProductDisplay";

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

  const handleRedirectProductPage = (item) => {
    let category, subcategory;
    if (item.category && item.subCategory) {
      const categoryId = Array.isArray(item.category)
        ? (item.category[0]?._id || item.category[0])
        : item.category;
      const subCategoryId = Array.isArray(item.subCategory)
        ? (item.subCategory[0]?._id || item.subCategory[0])
        : item.subCategory;
      category = categoryData.find(cat => String(cat._id) === String(categoryId));
      subcategory = subCategoryData.find(sub => String(sub._id) === String(subCategoryId));
    } else if (item._id && item.name) {
      category = item;
      subcategory = subCategoryData.find(sub => String(sub.category) === String(category._id));
    }
    if (!category || !subcategory) {
      console.log('Category or subcategory not found', { category, subcategory });
      return;
    }

    // If category.name is an array, join with '--'
    const categoryName = Array.isArray(category.name)
      ? category.name.join('--')
      : category.name;

    const url = `/${categoryName}---${category._id}/${valideURLConvert(subcategory.name)}-${subcategory._id}`;
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
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200 flex flex-col items-center cursor-pointer"
                onClick={() => handleRedirectProductPage(product)}
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
                  <h3
                    className="font-semibold text-base text-gray-800 truncate"
                    title={product.name}
                  >
                    {product.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* categorywise product display */}
      {
        categoryData.map((c,index)=>{
          return(
            <CategoryWiseProductDisplay key={c?._id + "CategorywiseProduct"} id={c?._id} name={c?.name}/>
          )
        })
      }
    </section>
  );
};

export default Home;
