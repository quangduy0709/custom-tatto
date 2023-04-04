import ContentBar from "./ContentBar";
import DesignArea from "./DesignArea";

const Content = () => {
  return (
    <div className="dl-content bg-[#f0f0f0] h-full flex-1 flex justify-center items-center relative">
      <ContentBar />
      <DesignArea />
    </div>
  );
};

export default Content;
