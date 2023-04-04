import { ImageLayerProps } from "../../interfaces/design";
import { useDispatch } from "react-redux";
import { selectLayer } from "../../redux/reducers/design";

const ImageLayer = ({ layer }: { layer: ImageLayerProps }) => {
  const dispatch = useDispatch();
  const onClick = () => {
    dispatch(selectLayer(layer.id));
  };

  return (
    <div
      id={layer.id}
      className={`image-layer cursor-pointer`}
      onClick={onClick}
      style={{
        transform: `translate(${layer.x}px, ${layer.y}px)`,
        width: layer.width,
        height: layer.height,
      }}
    >
      <img
        src={layer.url}
        style={{ objectFit: "fill", width: "100%", height: "100%" }}
      />
    </div>
  );
};

export default ImageLayer;
