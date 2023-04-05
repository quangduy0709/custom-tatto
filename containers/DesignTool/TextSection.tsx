import Image from "next/image";
import { useDispatch } from "react-redux";
import { LayerType } from "../../contants/design";
import { TextLayerProps } from "../../interfaces/design";
import { addLayer } from "../../redux/reducers/design";

const fonts = [
  {
    name: "Acakadut",
    previewImg:
      "https://s3.amazonaws.com/inkboxdesigns/fonts/temp/preview/Acakadut.png",
  },
  {
    name: "Accountant Signature",
    previewImg:
      "https://s3.amazonaws.com/inkboxdesigns/fonts/temp/preview/Accountant_Signature.png",
  },
];

const TextSection = () => {
  const dispatch = useDispatch();
  const addText = (font: any) => {
    const newTextLayer: TextLayerProps = {
      x: 0,
      y: 0,
      content: font.name,
      id: "2123",
      type: LayerType.TEXT,
      rotate: 0,
      width: 0,
      height: 0,
    };

    dispatch(addLayer(newTextLayer));
  };

  return (
    <div className="text-section">
      <div className="grid grid-cols-2 gap-4">
        {fonts.map((font) => (
          <div className="cursor-pointer" onClick={() => addText(font)}>
            {/* <Image fill src={font.previewImg} alt={font.name} /> */}
            <span>{font.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TextSection;
