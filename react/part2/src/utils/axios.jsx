import React from "react";
import axios from "axios";
const serverUrl = import.meta.env.SECRET_SERVER;
console.log(serverUrl);

const axiosInstance = axios.create({
  baseURL: serverUrl,
  headers: {
    "content-type": "application/json",
  },
  withCredentials: true,
  // timeout: 1 * 1000,
});
export default axiosInstance;