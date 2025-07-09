import React from "react";
import { useSelector } from "react-redux";
import isAdmin from "../utils/isAdmin";
import { FaBan } from "react-icons/fa";

const AdminPermission = ({ children }) => {
  const user = useSelector((state) => state.user);

  return (
    <>
      {isAdmin(user.role) ? (
        children
      ) : (
        <div className="min-h-[60vh] flex items-center justify-center bg-gray-900">
          <div className="bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-md flex flex-col items-center">
            <FaBan className="text-red-500 text-5xl mb-4" />
            <h2 className="text-2xl font-bold text-yellow-400 mb-2 text-center">Permission Denied</h2>
            <p className="text-gray-300 text-center mb-2">You do not have permission to access this page.</p>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminPermission;
