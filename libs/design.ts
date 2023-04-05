import { LayerProps } from "../interfaces/design";

export const exportHtml = (layer: LayerProps[]) => {
  const designArea = document.querySelector("#design-content");

  const designClone = designArea!.cloneNode(true);
};
