import "../styles/globals.css";
import "../styles/components/index.css";
import type { AppProps } from "next/app";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../redux/index";
import { Provider } from "react-redux";
import Head from "next/head";

export const store = configureStore({
  reducer: rootReducer,
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Component {...pageProps} />
    </Provider>
  );
}
