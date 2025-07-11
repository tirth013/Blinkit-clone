import React, { useEffect, useState } from "react";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import Axios from "../utils/Axios";
import ProductCardAdmin from "../components/ProductCardAdmin";

const ProductAdmin = () => {
  const [productData, setProductData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);

  const fetchProductData = async () => {
    try {
      setLoading(true);
      const res = await Axios({
        ...SummaryApi.getProduct,
        params: {
          page: page,
          limit: pageSize,
        },
      });

      const { data: responseData } = res;

      if (responseData.success) {
        setProductData(responseData.data);
        setTotalPages(responseData.totalNoPage);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [page, pageSize]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handlePageSizeChange = (newPageSize) => {
    setPageSize(parseInt(newPageSize));
    setPage(1); // Reset to first page when changing page size
  };

  return (
    <div className="min-h-[80vh] bg-gray-50 p-6 rounded-lg shadow-md">
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
          <h2 className="text-2xl font-bold text-gray-800">Products</h2>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-8">Loading...</div>
      ) : productData.length === 0 ? (
        <div className="text-center py-8">
          <div className="text-gray-500 text-lg">No products found</div>
          <div className="text-gray-400 text-sm mt-2">Products will appear here once uploaded</div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {productData.map((product, index) => (
              <ProductCardAdmin 
                key={product._id || index}
                product={product} 
                index={index} 
              />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex flex-col items-center mt-6 gap-4">
              
              {/* Pagination Controls */}
              <div className="flex items-center justify-center gap-2">
                {/* First Page Button */}
                <button
                  onClick={() => handlePageChange(1)}
                  disabled={page <= 1}
                  className="px-3 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
                  title="Go to first page"
                >
                  First
                </button>
                
                {/* Previous Button */}
                <button
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page <= 1}
                  className="px-4 py-2 bg-yellow-400 text-black rounded hover:bg-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                >
                  Previous
                </button>
                
                {/* Page Numbers */}
                <div className="flex items-center gap-1">
                  {/* Show first page and ellipsis if needed */}
                  {page > 3 && totalPages > 5 && (
                    <>
                      <button
                        onClick={() => handlePageChange(1)}
                        className={`px-3 py-2 rounded-full text-sm font-medium bg-gray-200 text-gray-700 hover:bg-gray-300`}
                      >1</button>
                      <span className="px-2">...</span>
                    </>
                  )}
                  {/* Show up to 5 page numbers centered around current page */}
                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter(pageNum => {
                      if (totalPages <= 5) return true;
                      if (page <= 3) return pageNum <= 5;
                      if (page >= totalPages - 2) return pageNum > totalPages - 5;
                      return Math.abs(pageNum - page) <= 2;
                    })
                    .map(pageNum => (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`px-3 py-2 rounded-full text-sm font-semibold transition-colors duration-150 ${
                          page === pageNum
                            ? "bg-yellow-500 text-black shadow"
                            : "bg-gray-100 text-gray-700 hover:bg-yellow-200"
                        }`}
                        style={{ minWidth: 36 }}
                      >
                        {pageNum}
                      </button>
                    ))}
                  {/* Show last page and ellipsis if needed */}
                  {page < totalPages - 2 && totalPages > 5 && (
                    <>
                      <span className="px-2">...</span>
                      <button
                        onClick={() => handlePageChange(totalPages)}
                        className={`px-3 py-2 rounded-full text-sm font-medium bg-gray-200 text-gray-700 hover:bg-gray-300`}
                      >{totalPages}</button>
                    </>
                  )}
                </div>
                
                {/* Next Button */}
                <button
                  onClick={() => handlePageChange(page + 1)}
                  disabled={page >= totalPages}
                  className="px-4 py-2 bg-yellow-400 text-black rounded hover:bg-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                >
                  Next
                </button>
                
                {/* Last Page Button */}
                <button
                  onClick={() => handlePageChange(totalPages)}
                  disabled={page >= totalPages}
                  className="px-3 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
                  title="Go to last page"
                >
                  Last
                </button>
              </div>
              
              
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProductAdmin;
