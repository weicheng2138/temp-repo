import axios from "axios";
import { toast } from "sonner";

const request = axios.create({
  baseURL: "/api",
  timeout: 5000,
});

// Add a request interceptor
request.interceptors.request.use(
  function (config) {
    console.log(config);
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  },
);

// Add a response interceptor
request.interceptors.response.use(
  function (response) {
    console.log(response);
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  function (error) {
    console.error(error);
    console.log("eeeee");
    toast("Something went Wrong when using axios", {
      // 中文設定中文
      action: {
        label: "Close",
        onClick: () => console.log("Undo"),
      },
    });
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  },
);

export { request };
