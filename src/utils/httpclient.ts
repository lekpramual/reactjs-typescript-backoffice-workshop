import axios from "axios";
import join from "url-join";
// @alert
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import {
  // server,
  apiUrl,
  NOT_CONNECT_NETWORK,
  NETWORK_CONNECTION_MESSAGE,
} from "@/constants";

const MySwal = withReactContent(Swal);
const isAbsoluteURLRegex = /^(?:\w+:)\/\//;

axios.interceptors.request.use(async (config: any) => {
  if (!isAbsoluteURLRegex.test(config.url)) {
    config.url = join(apiUrl, config.url);
  }
  config.timeout = 20000; // 10 Second
  return config;
});

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // console.log(JSON.stringify(error, undefined, 2));
    let message = error.message as string;
    MySwal.fire({
      icon: "error",
      title: message,
      showConfirmButton: false,
    });

    if (axios.isCancel(error)) {
      return Promise.reject(error);
    } else if (!error.response) {
      return Promise.reject({
        code: NOT_CONNECT_NETWORK,
        message: NETWORK_CONNECTION_MESSAGE,
      });
    }
    return Promise.reject(error);
  }
);

export const httpClient = axios;
