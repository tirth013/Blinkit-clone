export const baseURL = "http://localhost:8080";

const SummaryApi = {
  register: {
    url: "/api/user/register",
    method: "post",
  },
  login: {
    url: "/api/user/login",
    method: "post",
  },
  forgot_password: {
    url: "/api/user/forgot-password",
    method: "post",
  },
  verify_forgot_password_otp: {
    url: "/api/user/verify-forgot-password-otp",
    method: "post",
  },
  verify_email: {
    url: "/api/user/verify-email",
    method: "post",
  },
  logout: {
    url: "/api/user/logout",
    method: "post",
  },
  reset_password: {
    url: "/api/user/reset-password",
    method: "post",
  },
  userDetails: {
    url: "/api/user/details",
    method: "get",
  },
  uploadAvatar: {
    url: "/api/user/upload-avatar",
    method: "put",
  },
  updateUser: {
    url: "/api/user/update-user",
    method: "put",
  },
  addCategory: {
    url: "/api/category/add-category",
    method: "post",
  },
  uploadImage: {
    url: "/api/file/upload",
    method: "post",
  },
  getCategory: {
    url: "/api/category/get",
    method: "get",
  },
  updateCategory: {
    url: "/api/category/update",
    method: "put",
    headers: { "Content-Type": "application/json" },
  },
  deleteCategory: {
    url: "/api/category/delete",
    method: "delete",
  },
  // Subcategory endpoints
  addSubCategory: {
    url: "/api/subcategory/add-subcategory",
    method: "post",
  },
  getSubCategory: {
    url: "/api/subcategory/get",
    method: "get",
  },
  updateSubCategory: {
    url: "/api/subcategory/update",
    method: "put",
    headers: { "Content-Type": "application/json" },
  },
  deleteSubCategory: {
    url: "/api/subcategory/delete",
    method: "delete",
  },
  // Product endpoints
  addProduct: {
    url: "/api/product/create",
    method: "post",
  },
  getProduct: {
    url: "/api/product/get",
    method: "get",
  },
  getProductByCategory: {
    url: "/api/product/get-product-by-category",
    method: "post",
  },
  getProductByCategoryAndSubCategory: {
    url: "/api/product/get-product-by-category-and-subcategory",
    method: "post",
  },
  getProduct: {
    url: "/api/product/get",
    method: "get",
  },
};

export default SummaryApi;
