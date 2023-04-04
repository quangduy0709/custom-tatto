import { LayerType } from "../contants/design";

export type LayerProps = ImageLayerProps;

export interface BaseLayerProps {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rorate: number;
}

export interface ImageLayerProps extends BaseLayerProps {
  type: LayerType.IMAGE;
  url: string;
}

export interface TextLayerProps extends BaseLayerProps {
  type: LayerType.TEXT;
  content: string;
}
