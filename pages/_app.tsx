import "../styles/globals.css";
import "../styles/components/index.css";
import type { AppProps } from "next/app";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../redux/index";
import { Provider } from "react-redux";

export const store = configureStore({
  reducer: rootReducer,
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
