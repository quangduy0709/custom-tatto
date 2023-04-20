import { Fragment, ReactNode } from "react";
import { HiOutlineXMark } from "react-icons/hi2";
import { Dialog, Transition } from "@headlessui/react";
import Button, { ButtonProps } from "../Button";

export interface ModalProps {
  visible: boolean;
  onOk?: () => void;
  onCancel?: () => void;
  className?: string;
  children?: ReactNode;
  title?: ReactNode | string;
  hideOkBtn?: boolean;
  hideCancelBtn?: boolean;
  subClassName?: string;
  buttonOkText?: string;
  buttonCancelText?: string;
  okProps?: ButtonProps;
  cancelProps?: ButtonProps;
}

const Modal = ({
  visible = false,
  onOk,
  onCancel,
  className,
  children,
  title,
  hideOkBtn,
  hideCancelBtn,
  subClassName,
  buttonOkText = "Save",
  buttonCancelText = "Cancel",
  okProps,
  cancelProps,
}: ModalProps): JSX.Element => {
  const onClose = () => {
    onCancel && onCancel();
  };

  return (
    <Transition.Root show={visible} as={Fragment}>
      <Dialog
        as="div"
        className={`fixed inset-0 z-50 overflow-y-auto ${
          className ? className : ""
        }`}
        onClose={onClose}
      >
        <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <span
            className="hidden sm:inline-block sm:h-screen sm:align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div
              className={`inline-block transform rounded-lg bg-white px-4 pt-5 pb-4 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 sm:align-middle ${
                subClassName ? subClassName : ""
              }`}
            >
              <div className="absolute top-0 right-0 z-[999] hidden pt-5 pr-5 sm:block">
                <button
                  type="button"
                  className=" rounded-md bg-white text-gray-400 focus:outline-none hover:text-gray-500"
                  onClick={onClose}
                >
                  <span className="sr-only">Close</span>
                  <HiOutlineXMark className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              {title && (
                <div className=" pb-5 text-lg font-medium text-white">
                  {title}
                </div>
              )}
              <div>{children}</div>

              {hideCancelBtn && hideOkBtn ? null : (
                <div
                  className={`modal-footer mt-5 sm:mt-4 sm:flex sm:flex-row-reverse sm:gap-3`}
                >
                  {!hideOkBtn && (
                    <Button
                      onClick={onOk}
                      color="primary"
                      className="bg-indigo-600"
                      {...okProps}
                    >
                      {buttonOkText}
                    </Button>
                  )}

                  {!hideCancelBtn && (
                    <Button onClick={onClose} {...cancelProps}>
                      {buttonCancelText}
                    </Button>
                  )}
                </div>
              )}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Modal;
