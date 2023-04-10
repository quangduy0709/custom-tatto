import { CSSProperties } from "react";
import { ImageLayerProps, LayerProps } from "../interfaces/design";

export const processHtmlDesign = (layers: LayerProps[]) => {
  const design = document.querySelector("html") as HTMLElement;

  const elCloned = design.cloneNode(true) as HTMLElement;

  //tạo designArea mới
  const designArea = elCloned.querySelector("#design-content") as HTMLElement;

  // const ratio = DesignSize.Size4x6.w / DesignSize.Size4x6.displayW;

  // designArea.style.width = `${DesignSize.Size4x6.displayW}px`;
  // designArea.style.height = `${DesignSize.Size4x6.displayH}px`;
  // designArea.style.transform = `scale(${ratio},${ratio})`;
  designArea.style.transformOrigin = "0 0";

  designArea.querySelectorAll("div").forEach((item) => {
    if (item) item.remove();
  });

  // Create new html
  const newHtml = document.createElement("html");
  const clonedHtml = newHtml.cloneNode(true) as HTMLElement;

  clonedHtml.appendChild(designArea);

  const designs = processSides(layers, clonedHtml);

  return designs.map(({ type, html }) => {
    return {
      type,
      html: html.innerHTML,
    };
  });
};

export const processSides = (layers: LayerProps[], html: HTMLElement) => {
  const htmlCloned = html.cloneNode(true) as HTMLElement;

  const designArea = htmlCloned.querySelector("#design-content") as HTMLElement;

  return layers.map((item) => {
    processImage(item as ImageLayerProps, designArea);

    return {
      html: htmlCloned,
      type: item,
    };
  });
};

export const processImage = (
  layer: ImageLayerProps,
  designArea: HTMLElement
) => {
  const div = document.createElement("div");
  const image = document.createElement("img");

  image.width = layer.width;
  image.height = layer.height;
  image.setAttribute("src", layer.url ? generateImage(layer.url) : "");
  image.style.maxWidth = "100%";
  image.style.height = "200px";

  div.id = layer.id;
  div.style.position = "absolute";

  const config = generateImageConfig(layer) as {
    [key: string]: any;
  };

  for (const key in config) {
    if (Object.prototype.hasOwnProperty.call(config, key)) {
      div.style[key as any] = config[key];
    }
  }

  div.innerHTML = image.innerHTML;
  designArea.appendChild(div);
  div.appendChild(image);
};

export const generateImage = (path: string): string => {
  return process.env.CLIENT_STORAGE_DOMAIN + path;
};

export const generateImageConfig = (config: ImageLayerProps): CSSProperties => {
  const transform = generalTransform(
    { x: config.x, y: config.y },
    { x: 0, y: 0 },
    config.rotate
  );

  return {
    transform: transform,
  };
};

export const generalTransform = (
  translate: { x: number; y: number },
  scale: { x: number; y: number },
  rotate: number
): string => {
  return `translate(${translate.x}px, ${translate.y}px) scale(${scale.x},${scale.y}) rotate(${rotate}deg)`;
};
