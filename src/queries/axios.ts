import axios, { isAxiosError } from "axios";
import { toast } from "sonner";
import i18n from "@/i18n";

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
    console.log("i18n", i18n.t("monitoring.title"));
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    console.error(error);
    if (isAxiosError(error)) {
      toast("Error Axios Error", {
        action: {
          label: "Close",
          onClick: () => console.log("Undo"),
        },
      });
    } else {
      toast("Badly Wrong", {
        action: {
          label: "Close",
          onClick: () => console.log("Undo"),
        },
      });
    }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  },
);

export { request };
