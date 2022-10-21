import axios from "axios";
// import "./../bootstrap.js";

const http = axios.create({
  baseURL: "http://localhost:8080",
});

http.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("token");

    // config.headers = { "Access-Control-Allow-Origin": "" };
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  function (erro) {
    return Promise.reject(erro);
  }
);

export default http;
