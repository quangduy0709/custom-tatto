import { LayerType } from "../constants/design";

export type LayerProps = ImageLayerProps | TextLayerProps;

export interface BaseLayerProps {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotate: number;
}

export interface ImageLayerProps extends BaseLayerProps {
  type: LayerType.IMAGE;
  url: string;
}

export interface TextLayerProps extends BaseLayerProps {
  type: LayerType.TEXT;
  content: string;
}
