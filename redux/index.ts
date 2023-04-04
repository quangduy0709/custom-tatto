import { combineReducers } from "redux";
import design from "./reducers/design";

const rootReducer = combineReducers({
  design,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
