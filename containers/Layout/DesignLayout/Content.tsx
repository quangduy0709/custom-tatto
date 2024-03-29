import ContentBar from "./ContentBar";
import DesignArea from "../../DesignArea";

const Content = () => {
  return (
    <div className="dl-content bg-[#f0f0f0] flex-1 flex justify-center items-center relative z-0 w-full mx-auto">
      {/* <ContentBar /> */}
      <DesignArea />
    </div>
  );
};

export default Content;
