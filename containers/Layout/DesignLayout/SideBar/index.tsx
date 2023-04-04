import { ChevronLeftIcon } from "@heroicons/react/20/solid";
import { useMemo, useState } from "react";
import { HiOutlineSquare3Stack3D } from "react-icons/hi2";
import { IoImagesOutline } from "react-icons/io5";
import { MdOutlineUploadFile } from "react-icons/md";
import { RxText } from "react-icons/rx";
import Upload from "./Upload";
import TextSection from "../../../DesignTool/TextSection";

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const [choice, setChoice] = useState("");

  const openDrawer = (value: string) => {
    setOpen(true);
    setChoice(value);
  };

  const closeDrawer = () => {
    setOpen(false);
  };

  //dainh will code this
  const onZoom = () => {};

  const sideBarMenu = [
    {
      key: "designs",
      label: "Designs",
      icon: IoImagesOutline,
    },
    {
      key: "upload",
      label: "Upload",
      icon: MdOutlineUploadFile,
    },
    {
      key: "text",
      label: "Text",
      icon: RxText,
    },
    {
      key: "layers",
      label: "Layers",
      icon: HiOutlineSquare3Stack3D,
    },
  ];

  const renderContent = useMemo(() => {
    switch (choice) {
      case "designs":
        return <></>;
      case "upload":
        return <Upload />;
      case "text":
        return <TextSection />;
      case "layers":
        return <></>;
      default:
        return <></>;
    }
  }, [choice]);

  return (
    <div className="dl-sidebar h-full flex">
      <div className="dl-sidebar-tabs bg-[#212121] h-full">
        <div className="flex flex-col text-sm text-white font-semibold justify-center items-center">
          {sideBarMenu.map((item) => {
            return (
              <div
                className={`items px-4 py-6  cursor-pointer items-center flex flex-col justify-center ${
                  item.key === choice
                    ? "bg-[#373737] w-full"
                    : "hover:text-gray-500"
                }`}
                onClick={() => openDrawer(item.key)}
                key={item.key}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </div>
            );
          })}
        </div>
      </div>
      <div
        className={`dl-sidebar-drawer flex-1 shadow-xl z-50 relative  bg-white transition-all ${
          open ? "w-[300px]" : "w-0"
        }`}
      >
        {open && renderContent}
        <ButtonCloseDrawer open={open} onClick={closeDrawer} />
      </div>
    </div>
  );
};

export default Sidebar;

const ButtonCloseDrawer = ({
  open,
  onClick,
}: {
  open: boolean;
  onClick: () => void;
}) => {
  return (
    <div
      className={`${
        open
          ? "absolute top-1/2 -translate-y-1/2 -right-4 cursor-pointer z-[999]"
          : "invisible"
      }`}
      onClick={onClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        width="24"
        height="84"
        viewBox="0 0 24 84"
      >
        <defs>
          <filter
            data-v-5f0ce842=""
            id="prefix__a"
            width="196.7%"
            height="118.9%"
            x="-31.7%"
            y="-9.4%"
            filterUnits="objectBoundingBox"
          >
            <feOffset
              data-v-5f0ce842=""
              in="SourceAlpha"
              result="shadowOffsetOuter1"
              dx="3"
            ></feOffset>
            <feGaussianBlur
              data-v-5f0ce842=""
              in="shadowOffsetOuter1"
              result="shadowBlurOuter1"
              stdDeviation="2"
            ></feGaussianBlur>
            <feColorMatrix
              data-v-5f0ce842=""
              in="shadowBlurOuter1"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0"
            ></feColorMatrix>
          </filter>
          <path
            id="prefix__b"
            d="M0 .376l12.108 7.333C13.903 8.797 15 10.743 15 12.842v51.846c0 2.08-1.078 4.012-2.849 5.105L0 77.293V.375z"
          ></path>
        </defs>
        <g fill="none" fillRule="evenodd" transform="translate(2 3)">
          <use
            fill="#000"
            filter="url(#prefix__a)"
            xlinkHref="#prefix__b"
          ></use>
          <use fill="#FFF" xlinkHref="#prefix__b"></use>
        </g>
      </svg>
      <ChevronLeftIcon
        className={`w-4 h-4 absolute top-1/2 -translate-y-1/2`}
      />
    </div>
  );
};
