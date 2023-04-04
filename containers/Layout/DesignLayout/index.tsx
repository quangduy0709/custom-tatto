import Content from "./Content";
import Sidebar from "./SideBar";

const DesignLayout = () => {
  return (
    <div className="design-layout flex">
      <Sidebar />
      <Content />
    </div>
  );
};

export default DesignLayout;
