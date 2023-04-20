import React from "react";
import Modal from "../../components/Modal";
import { useModal } from "../../hooks/useModal";
import { PrintSize } from "../../constants/design";
import { useDispatch, useSelector } from "react-redux";
import { updateSize } from "../../redux/reducers/design";
import { RootState } from "../../redux";

const SizeModal = () => {
  const dispatch = useDispatch();
  const { onCancelModal, onOpenModal, open } = useModal();
  const { size } = useSelector((state: RootState) => state.design);

  const sizeOpts = [
    {
      width: 192,
      height: 192,
      image:
        "https://inkboxdesigns.imgix.net/website/custom/size-selector/2x2_stencil_cropped.jpg?w=240&dpr=2",
      subImage:
        "https://inkboxdesigns.imgix.net/website/custom/size-selector/2x2_stencil_cropped.jpg?w=240&dpr=2",
      type: PrintSize.SMALL,
      value: '2" x 2"',
    },
    {
      width: 288,
      height: 288,
      image:
        "	https://inkboxdesigns.imgix.net/website/custom/size-selector/3x3_stencil_cropped.jpg?w=240&dpr=2",
      subImage:
        "https://inkboxdesigns.imgix.net/website/custom/size-selector/3x3_photo.jpg?w=240&amp;dpr=2",
      type: PrintSize.MEDIUM,
      value: '3" x 3"',
    },
    {
      width: 384,
      height: 384,
      image:
        "https://inkboxdesigns.imgix.net/website/custom/size-selector/4x4_stencil_cropped.jpg?w=240&dpr=2",
      subImage:
        "https://inkboxdesigns.imgix.net/website/custom/size-selector/3x3_photo.jpg?w=240&amp;dpr=2",
      type: PrintSize.LARGE,
      value: '4" x 4"',
    },
    {
      width: 480,
      height: 192,
      image:
        "https://inkboxdesigns.imgix.net/website/custom/size-selector/5x2_stencil_cropped.jpg?w=240&dpr=2",
      subImage:
        "https://inkboxdesigns.imgix.net/website/custom/size-selector/3x3_photo.jpg?w=240&amp;dpr=2",
      type: PrintSize.WIDE,
      value: '5" x 2"',
    },
  ];

  const handleOnClick = (
    width: number,
    height: number,
    type: PrintSize,
    value: string
  ) => {
    dispatch(
      updateSize({ width, height, type, scale: 1, scaleX: 1, scaleY: 1, value })
    );
    onCancelModal();
  };

  return (
    <>
      <button
        className="md:hidden lg:block mr-2 md:mr-6 px-4 py-2 md:px-6  border border-solid md:border-black rounded-md font-bold"
        onClick={onOpenModal}
      >
        <span className=" lg:block">Size: {size.value}</span>
      </button>
      <Modal
        onCancel={onCancelModal}
        visible={open}
        subClassName="md:min-w-[800px]"
      >
        <div className="flex flex-col relative items-center pb-20 sm:pb-8 h-full overflow-x-hidden overflow-y-auto flex-1">
          <div className="text-center p-6">
            <h3 className="font-heading font-bold text-xl">
              Have a Size in Mind?
            </h3>
            <p className="max-w-md m-auto text-base leading-tight pt-1">
              Select a preset size and get started!
            </p>
          </div>
          <div className="relative w-full flex-1 flex pb-6">
            <div className=" w-full flex justify-between items-center overflow-x-scroll overflow-y-hidden">
              <ul className="flex items-end space-x-6 px-6 w-max">
                {sizeOpts.map((item, index) => (
                  <li
                    className="group/item"
                    key={index}
                    onClick={() =>
                      handleOnClick(
                        item.width,
                        item.height,
                        item.type,
                        item.value
                      )
                    }
                  >
                    <a
                      href="#"
                      className="flex flex-col justify-center items-center cursor-pointer relative rounded"
                    >
                      <div className=" relative border p-2 flex justify-center items-center rounded">
                        <div className="absolute w-full h-full top-0 p-1.5 pointer-events-none">
                          <div className="w-full h-full rounded border border-dashed"></div>
                        </div>
                        <img
                          src={item.image}
                          className="w-full h-full top-0 left-0 object-center object-contain group-hover/item:visible"
                        />
                        <img
                          src={item.subImage}
                          className="absolute w-full h-full top-0 left-0 object-center object-cover invisible group-hover/item:visible"
                        />
                      </div>
                      <div className="w-full px-1 pb-1 pt-4 flex flex-col items-center rounded-b-sm">
                        <div className="flex pt-2 flex-col items-center justify-center">
                          <span className="font-bold">{item.type}</span>
                          <span className="text-gray-500">({item.value})</span>
                        </div>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="chevrons absolute w-full top-0 left-0 pointer-events-none hidden sm:block">
              <div className="chevronRight noHighlight"></div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default SizeModal;
