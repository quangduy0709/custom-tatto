import { useState } from "react";

export const useModal = () => {
  const [open, setOpen] = useState(false);

  const onOpenModal = () => {
    setOpen(true);
  };

  const onCancelModal = () => {
    setOpen(false);
  };

  return { open, onOpenModal, onCancelModal };
};
