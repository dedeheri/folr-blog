import React from "react";

function ToastSuccess({ message }) {
  return (
    <div className="bg-green-50 p-2 rounded-md text-green-500 dark:bg-green-900 dark:text-green-500 flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <h1 className="font-medium">{message}</h1>
      </div>
    </div>
  );
}

export default ToastSuccess;
