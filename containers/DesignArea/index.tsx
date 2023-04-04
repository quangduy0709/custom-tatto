import { useSelector } from "react-redux";
import { LayerType } from "../../contants/design";
import { RootState } from "../../redux";
import Handler from "./Handler";
import ImageLayer from "./ImageLayer";
import TextLayer from "./TextLayer";

const DesignArea = () => {
  const design = useSelector((state: RootState) => state.design);
  return (
    <div className="w-[850px] h-[850px] bg-white relative">
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
