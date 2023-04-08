import Header from "../Header";
import Content from "./Content";
import Sidebar from "./SideBar";

const DesignLayout = () => {
  return (
    <div className="flex flex-col">
      <Header />
      <div className="flex design-layout h-[calc(100vh-79px)] flex-col-reverse md:flex-row">
        <Sidebar />
        <Content />
      </div>
    </div>
  );
};

export default DesignLayout;
