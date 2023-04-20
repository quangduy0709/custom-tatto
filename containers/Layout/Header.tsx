import { GiHamburgerMenu } from "react-icons/gi";
import Button from "../../components/Button";
import SizeModal from "../SizeModal";
import { useSelector } from "react-redux";
import { RootState } from "../../redux";

const Header = () => {
  const { layers, size } = useSelector((state: RootState) => state.design);
  const handleAddToCart = () => {
    const data = { size: size, layers: layers };
    window.parent.postMessage({ type: "submitForm", data: data }, "*");
  };

  return (
    <header id="header" className="sticky top-0 z-[900] w-full shadow-xl">
      <div>
        <nav className=" flex flex-wrap flex-col md:flex-row bg-white text-black z-30 relative items-center">
          <div className="md:shadow-none flex items-center justify-between md:justify-start px-2 py-4 sm:p-4 md:pr-0">
            <div className="flex items-center">
              <div className="p-1 md:mr-6 flex items-center cursor-pointer hover:text-gray-400">
                <GiHamburgerMenu className="w-6 h-6" />
              </div>
            </div>
            <div className="flex-1">
              <a
                id="logo"
                href="/"
                className=" m-auto py-1 flex-1 h-full flex items-center text-black max-w-[150px] md:max-w-none"
              >
                <svg
                  aria-labelledby="LOGO_DESC_ID"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 808.778 106.037"
                  fill="currentColor"
                  className="w-full h-full"
                >
                  <title>Inkbox</title>
                  <path d="M0 6.957h48.666v96.249H0zM64.422 6.957h48.8l42.858 43.688h.27V6.957h45.696v96.249h-42.867L110.393 56.01h-.269v47.196H64.422V6.957zM217.584 6.957h48.665V47.95h.27l31.369-40.993h58.372l-44.097 49.741 41.806 46.508h-55.677l-31.773-36.821h-.27v36.821h-48.665V6.957zM415.484 80.828h18.542c7.549 0 9.436-2.635 9.436-7.01 0-4.376-1.887-7.009-9.301-7.009h-18.677zm0-34.778h17.465c7.461 0 9.705-2.318 9.705-6.942s-2.291-6.943-9.032-6.943h-18.138zM368.32 6.957h79.702c24.615 0 37.575 9.435 37.575 24.129 0 14.964-9.571 22.95-24.07 23.833v.325c15.484 1.274 28.199 4.944 28.199 22.887 0 14.345-10.358 25.075-37.048 25.075H368.32zM660.756 56.967L625.708 6.956h56.889l12.523 24.541 13.494-24.541h55.401l-36.466 50.011 33.637 46.238h-53.92l-12.183-21.574-.076-.134-.082.128-13.811 21.58h-54.598l34.24-46.238z"></path>
                  <path d="M564.472 75.909c-13.83 0-16.851-5.164-16.851-20.828s3.021-20.828 16.85-20.828c13.83 0 16.851 5.164 16.851 20.828S578.3 75.91 564.472 75.91m-.003-71.784c-35.048 0-66.455 10.514-66.455 48.259 0 22.108 4.985 53.653 66.455 53.653s66.46-31.545 66.46-53.653c0-37.745-31.412-48.26-66.46-48.26M806.635 25.858a60.651 60.651 0 00-4.618-6.672 75.42 75.42 0 01-5.9-9.102A46.068 46.068 0 01792.199.001a46.075 46.075 0 01-3.918 10.083 75.555 75.555 0 01-5.9 9.102 60.498 60.498 0 00-4.618 6.672 15.188 15.188 0 00-2.138 7.732 12.992 12.992 0 005.544 9.805 19.883 19.883 0 0022.06 0 12.985 12.985 0 005.543-9.805 15.188 15.188 0 00-2.137-7.732"></path>
                </svg>
              </a>
            </div>
          </div>
          <div className="relative flex-1 hidden md:block">
            <div className="pl-2 md:p-4 flex items-center justify-start md:justify-between p-2 overflow-hidden">
              <div className="flex flex-1 justify-end md:justify-start items-center">
                <div className="ml-5 mr-9 hidden md:flex relative items-center cursor-pointer">
                  <button className="px-2 py-2 hover:text-gray-400">
                    File
                  </button>
                </div>
                <div className="hidden xl:block mr-6 hover:text-gray-400 w-full md:w-40 lg:w-56 max-w-lg relative">
                  <input
                    placeholder="Untitled Tattoo"
                    className=" bg-white border px-3 py-2 block w-full rounded-md sm:text-sm sm:leading-5 border-gray-200  cursor-pointer"
                  />
                </div>
                <SizeModal />
              </div>
              <Button color="white">Preview</Button>
              <Button id="addToCart" color="primary" onClick={handleAddToCart}>
                Add to card
              </Button>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
