import React from "react";

const ConfirmBox = ({ cancel, confirm, close }) => {
  return (
    <div className="fixed top-0 bottom-0 right-0 left-0 z-50 bg-neutral-800 bg-opacity-70 p-4 flex justify-center items-center">
      <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg">
        <div className="mb-4">
          <h1 className="text-xl font-bold text-gray-800 mb-2">Confirm Delete</h1>
          <p className="text-gray-600 font-light">Are you sure you want to delete this category? This action cannot be undone.</p>
        </div>
        <div className="flex justify-end gap-2">
          <button
            className="px-4 py-2 rounded bg-gray-200 text-gray-800 font-semibold hover:bg-gray-300 transition"
            onClick={cancel}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 rounded bg-red-500 text-white font-semibold hover:bg-red-600 transition"
            onClick={confirm}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmBox;
