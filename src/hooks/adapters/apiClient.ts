import axios from "axios";

export const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  function (config) {
    // Do something before request is sent here
    // console.log(config);
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
apiClient.interceptors.response.use(
  function (response) {
    // Do something with response data  here
    return response;
  },
  function (error) {
    //console.log("apiClient:", error?.response);
    return Promise.reject(error);
  }
);