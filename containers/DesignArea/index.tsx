import { useSelector } from "react-redux";
import { LayerType } from "../../contants/design";
import { RootState } from "../../redux";
import Handler from "./Handler";
import ImageLayer from "./ImageLayer";
import TextLayer from "./TextLayer";

const DesignArea = () => {
  const design = useSelector((state: RootState) => state.design);
  return (
    <div
      className="max-w-[750px] max-h-[700px] bg-white relative w-full h-full mx-6"
      id="design-content"
    >
      <Handler />

      {design.layers.map((layer) =>
        layer.type === LayerType.IMAGE ? (
          <ImageLayer layer={layer} key={layer.id} />
        ) : (
          <TextLayer layer={layer} key={layer.id} />
        )
      )}
    </div>
  );
};

export default DesignArea;
