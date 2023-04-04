import { TextLayerProps } from "../../interfaces/design";
import { useDispatch } from "react-redux";
import { selectLayer } from "../../redux/reducers/design";

const TextLayer = ({ layer }: { layer: TextLayerProps }) => {
  const dispatch = useDispatch();
  const onClick = () => {
    dispatch(selectLayer(layer.id));
  };

  return (
    <div
      id={layer.id}
      className={`text-layer cursor-pointer`}
      onClick={onClick}
      style={{
        transform: `translate(${layer.x}px, ${layer.y}px)`,
        position: "absolute",
      }}
    >
      <span dangerouslySetInnerHTML={{ __html: layer.content }}></span>
    </div>
  );
};

export default TextLayer;
