import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LayerType } from "../../contants/design";
import { LayerProps } from "../../interfaces/design";

interface DesignProps {
  layers: LayerProps[];
  selected: string[];
}

const initialState: DesignProps = {
  selected: [],
  layers: [
    {
      id: "12312",
      type: LayerType.IMAGE,
      x: 300,
      y: 300,
      width: 500,
      height: 500,
      url: "https://static.vecteezy.com/system/resources/previews/006/325/639/original/dog-cartoon-colored-clipart-illustration-free-vector.jpg",
      rorate: 0,
    },
  ],
};

const slicer = createSlice({
  name: "design",
  initialState: initialState,
  reducers: {
    selectLayer(state, action: PayloadAction<string>) {
      state.selected = [action.payload];
      return state;
    },
  },
});
export const { selectLayer } = slicer.actions;
export default slicer.reducer;
