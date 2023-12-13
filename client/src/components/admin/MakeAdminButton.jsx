import React from "react";

const MakeAdminButton = ({ userId, isAdmin, onChangeRole }) => {
    // console.log(isAdmin)
    const handleClick = () => {
        onChangeRole(userId, isAdmin)
    }
  return (
    <button
      type="button"
      onClick={handleClick}
      className="text-white shadow-md hover:shadow-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xs px-3 py-2 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
    >
    {isAdmin ==='Admin' ? "Revoke Admin" : "Make Admin"}
    </button>
  );
};

export default MakeAdminButton;
