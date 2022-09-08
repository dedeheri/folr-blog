import React from "react";

function ToastError({ message }) {
  return (
    <div className="bg-red-50 p-2 w-full rounded-md text-red-500 dark:bg-red-200 dark:text-red-500 flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <h1 className="font-medium">{message}</h1>
      </div>
    </div>
  );
}

export default ToastError;
