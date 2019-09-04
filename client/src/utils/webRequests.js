import axios from "axios";

var instance = axios.create({
  baseURL: "http://localhost:3000",
});

instance.interceptors.request.use(
  async function (config) {
    // Do something before request is sent
    
    const userToken = await window.localStorage.getItem("userToken");
    if (userToken) {
      config.headers.Authorization = userToken;
    }
    return config;
  },
  function (err) {
    // Do something with the request error
    return Promise.reject(err);
  }
);

instance.interceptors.response.use(
  async function (res) {
    // Do something with the response    
    if (res.headers.jwt) {  
      window.localStorage.setItem("userToken", res.headers.jwt);
    }
    return res;
  },
  function (err) {
    // Do something with response error
    return Promise.reject(err);
  }
);

export default instance;
