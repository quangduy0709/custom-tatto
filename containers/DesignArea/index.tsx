import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LayerType } from "../../constants/design";
import { RootState } from "../../redux";
import { updateSize } from "../../redux/reducers/design";
import Handler from "./Handler";
import ImageLayer from "./ImageLayer";
import TextLayer from "./TextLayer";

const DesignArea = () => {
  const { layers, size } = useSelector((state: RootState) => state.design);

  const dispatch = useDispatch();

  const ref = useRef<HTMLDivElement>(null);
  const refPar = useRef<HTMLDivElement>(null);

  const scalePages = () => {
    if (!ref.current || !refPar.current) return;

    const scaleX = refPar.current.offsetWidth / size.width;
    const scaleY = refPar.current.offsetHeight / size.height;

    const scale = scaleX > scaleY ? scaleY : scaleX;

    dispatch(updateSize({ scaleX, scaleY, scale }));

    // cập nhật lại vị trí theo màn hình
    const newLeftPos = Math.abs(
      Math.floor((size.width * scale - refPar.current.offsetWidth) / 2)
    );

    const newTopPos = Math.abs(
      Math.floor((size.height * scale - refPar.current.offsetHeight) / 2)
    );

    if (ref.current) {
      ref.current.style.width = `${scale * size.width}px`;
      ref.current.style.height = `${scale * size.height}px`;
      ref.current.style.left = `${newLeftPos}px`;
      ref.current.style.top = `${newTopPos}px`;
    }
  };

  useEffect(() => {
    window.removeEventListener("resize", scalePages);
    scalePages(); // Cập nhật kích thước lần đầu tiên
    window.addEventListener("resize", scalePages);
    return () => window.removeEventListener("resize", scalePages);
  }, [size.type]);

  return (
    <div className="absolute top-5 left-5 right-5 bottom-5" ref={refPar}>
      <div
        className="bg-white relative transition-all"
        id="design-content"
        ref={ref}
        style={{
          transformOrigin: "top left",
        }}
      >
        <div className="absolute w-full h-full top-0 p-2 pointer-events-none">
          <div className="w-full h-full rounded border border-dashed border-red-300"></div>
        </div>
        <Handler />

        {layers.map((layer) =>
          layer.type === LayerType.IMAGE ? (
            <ImageLayer layer={layer} key={layer.id} />
          ) : (
            <TextLayer layer={layer} key={layer.id} />
          )
        )}
      </div>
    </div>
  );
};

export default DesignArea;
