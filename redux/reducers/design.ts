import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LayerProps } from "../../interfaces/design";

interface DesignProps {
  layers: LayerProps[];
  selected: string[];
}

const initialState: DesignProps = {
  selected: [],
  layers: [],
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
  },
});
export const { selectLayer, addLayer } = slicer.actions;
export default slicer.reducer;
