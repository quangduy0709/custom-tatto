import Moveable, { OnDrag } from "react-moveable";
import { OnResize, OnRotate } from "react-moveable/declaration/types";
import { useSelector } from "react-redux";
import { RootState } from "../../redux";
import { useRef } from "react";

const Handler = () => {
  const { selected, layers } = useSelector((state: RootState) => state.design);
  const moveableRef = useRef<Moveable>(null);

  const onDrag = (e: OnDrag) => {
    const target = document.getElementById(selected[0]);
    if (target) {
      target.style.transform = e.style.transform;
    }
  };

  const onResize = (e: OnResize) => {
    const target = document.getElementById(selected[0]);
    if (target) {
      target.style.width = e.style.width;
      target.style.height = e.style.height;
    }
  };

  const onRotate = (e: OnRotate) => {
    const target = document.getElementById(selected[0]);
    if (target) {
      target.style.transform = e.style.transform;
    }
  };

  return selected.length ? (
    <Moveable
      target={document.getElementById(`${selected[0]}`)}
      renderDirections={["nw", "ne", "sw", "se"]}
      resizable
      origin={false}
      draggable
      throttleResize={1}
      rotationPosition="bottom"
      keepRatio
      rotatable
      onDrag={onDrag}
      onResize={onResize}
      onRotate={onRotate}
<<<<<<< HEAD
      pinchable={["resizable", "rotatable"]}
      snappable={true}
      isDisplaySnapDigit={true}
      isDisplayInnerSnapDigit={false}
      snapDirections={{
        top: true,
        left: true,
        bottom: true,
        right: true,
        center: true,
        middle: true,
      }}
      elementSnapDirections={{
        top: true,
        left: true,
        bottom: true,
        right: true,
        center: true,
        middle: true,
      }}
      snapThreshold={5}
      elementGuidelines={layers.map((item) => ({
        element: `#${item.id}`,
      }))}
=======
      pinchable={["rotatable", "resizable"]}
>>>>>>> origin/main
    />
  ) : null;
};

export default Handler;
