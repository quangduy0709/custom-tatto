import axios from "axios";

const instance = axios.create({
  headers: { "Content-Type": "application/json" },
  baseURL: "/api",
});

declare global {
  interface Window {
    app: any;
  }
}

instance.interceptors.request.use(async (req) => {
  return req;
});

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle errors
    const { response } = error;

    let res: { [index: string]: any } = {};

    if (!response) throw new Error("Something went wrong");

    res.status = response.status;
    res.statusText = response.statusText;

    if (!response.data) throw new Error("Something went wrong");

    res = { ...res, ...response.data };

    throw res;
  }
);

export default instance;
