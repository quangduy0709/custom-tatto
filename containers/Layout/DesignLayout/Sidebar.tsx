import { useState } from "react";
import { ChevronLeftIcon } from "@heroicons/react/20/solid";
import TextSection from "../../DesignTool/TextSection";

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  const openDrawer = () => {
    setOpen(true);
  };

  const closeDrawer = () => {
    setOpen(false);
  };

  //dainh will code this
  const onZoom = () => {};

  return (
    <div className="dl-sidebar h-screen flex">
      <div className="dl-sidebar-tabs bg-[#212121] h-full">
        <div className="flex flex-col text-sm text-white font-semibold justify-center items-center">
          <div
            className="items px-4 py-6 hover:text-gray-500 cursor-pointer"
            onClick={openDrawer}
          >
            Designs
          </div>
          <div
            className="items px-4 py-6 hover:text-gray-500 cursor-pointer"
            onClick={openDrawer}
          >
            Upload
          </div>
          <div
            className="items px-4 py-6 hover:text-gray-500 cursor-pointer"
            onClick={openDrawer}
          >
            Text
          </div>
          <div
            className="items px-4 py-6 hover:text-gray-500 cursor-pointer"
            onClick={openDrawer}
          >
            Layers
          </div>
        </div>
      </div>
      <div
        className={`dl-sidebar-drawer flex-1 shadow-xl z-0 relative  bg-white transition-all ${
          open ? "w-[300px]" : "w-0"
        }`}
      >
        {open ? (
          <div>
            <TextSection />
          </div>
        ) : null}
        <div
          className="absolute bg-white top-1/2 cursor-pointer border-r border-gray-200 text-gray-500 font-semibold -right-3 -translate-y-1/2 h-16 rounded-br-[50px] rounded-tr-[50px] flex items-center"
          onClick={closeDrawer}
        >
          <ChevronLeftIcon
            className={`${
              open ? "w-4" : "w-0"
            } h-4 transition-all hover:-translate-x-1`}
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
