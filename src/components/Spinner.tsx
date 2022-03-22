import React from "react";

const Spinner = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-4 border-green-600"></div>
    </div>
  );
};

export default Spinner;
