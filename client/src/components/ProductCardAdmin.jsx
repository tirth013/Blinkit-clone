import React from "react";

const ProductCardAdmin = ({ product, index }) => {
  return (
    <div
      key={product._id || index}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200"
    >
      <div className="h-48 bg-gray-200 flex items-center justify-center">
        {product.image && product.image.length > 0 ? (
          <img
            src={product.image[0]}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="text-gray-400">No Image</span>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2 text-gray-800">
          {product.name}
        </h3>
        <p className="text-gray-600 text-sm mb-2 line-clamp-2">
          {product.description}
        </p>
        <div className="flex justify-between items-center mb-2">
          <span className="font-bold text-yellow-600">
            ₹{product.price}
          </span>
          <span className="text-sm text-gray-500">
            {product.unit}
          </span>
        </div>
        {product.discount > 0 && (
          <span className="text-sm text-green-600 font-medium">
            -{product.discount}% off
          </span>
        )}
        <div className="mt-3 pt-3 border-t border-gray-100">
          <div className="flex justify-between text-xs text-gray-500">
            <span>Stock: {product.stock}</span>
            <span>ID: {product._id?.slice(-6)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCardAdmin;
