import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LayerProps, SizeProps } from "../../interfaces/design";
import { PrintSize } from "../../constants/design";

interface DesignProps {
  layers: LayerProps[];
  selected: string[];
  size: SizeProps;
}

type UpdateSize = Partial<SizeProps>;

const initialState: DesignProps = {
  selected: [],
  layers: [],
  size: {
    height: 850,
    width: 850,
    type: PrintSize.MEDIUM,
    scale: 1,
    scaleX: 1,
    scaleY: 1,
    value: "3x3",
  },
};

const slicer = createSlice({
  name: "design",
  initialState: initialState,
  reducers: {
    selectLayer(state, action: PayloadAction<string>) {
      state.selected = [action.payload];
      return state;
    },
    addLayer(state, action: PayloadAction<LayerProps>) {
      state.layers.push(action.payload);
      return state;
    },
    updateSize(state, action: PayloadAction<UpdateSize>) {
      state.size = { ...state.size, ...action.payload };
      return state;
    },
  },
});
export const { selectLayer, addLayer, updateSize } = slicer.actions;
export default slicer.reducer;
