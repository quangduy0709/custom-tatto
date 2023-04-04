import React from "react";

const ProgressBar = ({ progress }: { progress: number }) => {
  return (
    <div className="w-full h-4 mb-4 bg-gray-300 rounded-full">
      <div
        className="h-4 bg-slate-400 rounded-full "
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
