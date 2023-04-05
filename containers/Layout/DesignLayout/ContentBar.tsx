import React from "react";
import { CiUndo } from "react-icons/ci";
import { HiOutlinePencil } from "react-icons/hi2";

const ContentBar = () => {
  return (
    <div className="absolute shadow-sm bg-white top-0 left-0 w-full h-[64px] items-center my-auto flex">
      <div className="flex mx-4 gap-6 py-1">
        <CiUndo className="w-6 h-10 cursor-pointer hover:bg-gray-100" />
        <CiUndo className="w-6 h-10 cursor-pointer hover:bg-gray-100 rotate-180" />
        <HiOutlinePencil className="w-6 h-10 cursor-pointer hover:bg-gray-100" />
      </div>
    </div>
  );
};

export default ContentBar;
