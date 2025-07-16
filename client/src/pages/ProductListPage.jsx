import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";

const LIMIT = 10;

const ProductListPage = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPage, setTotalPage] = useState(1);
  const params = useParams();

  const categoryId = params.category.split("-").slice(-1)[0];
  const subCategoryId = params.subCategory.split("-").slice(-1)[0];

  const fetchProductdata = async (reset = false) => {
    try {
      setLoading(true);
      const res = await Axios({
        ...SummaryApi.getProductByCategoryAndSubCategory,
        data: {
          categoryId,
          subCategoryId,
          page,
          limit: LIMIT,
        },
      });

      const { data: responseData } = res;

      if (responseData.success) {
        if (reset || page === 1) {
          setData(responseData.data);
        } else {
          setData((prev) => [...prev, ...responseData.data]);
        }
        setTotalPage(Math.ceil(responseData.totalCount / LIMIT));
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPage(1);
    fetchProductdata(true);
  }, [params.category, params.subCategory]);

  useEffect(() => {
    if (page > 1) {
      fetchProductdata();
    }
  }, [page]);

  const handleLoadMore = () => {
    if (page < totalPage) setPage((prev) => prev + 1);
  };

  return (
    <section className="sticky top-24 lg:top-20">
      <div className="container sticky top-24 mx-auto grid grid-cols-[100px,1fr] md:grid-cols-[200px,1fr] lg:grid-cols-[280px,1fr]">
        {/* Sub category */}
        <div className="bg-red-500 min-h-[79vh]">sub category</div>

        {/* Product */}
        <div className="bg-white shadow-md p-2">
          {/* Render products here */}
          <h3>{params.subCategory}</h3>
          {data.map((product) => (
            <div key={product._id}>{product.name}</div>
          ))}
          {loading && <div>Loading...</div>}
          {page < totalPage && (
            <button onClick={handleLoadMore} disabled={loading}>
              Load More
            </button>
          )}
          {(!loading && data.length === 0) && <div>No products found.</div>}
        </div>
      </div>
    </section>
  );
};

export default ProductListPage;
