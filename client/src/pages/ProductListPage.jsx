import React from "react";
import { useParams } from "react-router-dom";

const ProductListPage = () => {
  const { category, subCategory } = useParams();
  return (
    <div>
      <h2>ProductListPage</h2>
    </div>
  );
};

export default ProductListPage;
