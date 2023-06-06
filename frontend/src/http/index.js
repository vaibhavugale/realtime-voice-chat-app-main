import axios from "axios";

const api = axios.create({
  baseUrl: process.env.REACT_APP_APIURL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export const sendOtp = (data) => {
  return api.post("http://localhost:5500/api/send-otp", data);
};
export const verifyOtp = (data) => {
  return api.post("http://localhost:5500/api/verify-otp", data);
};
export const activate = (data) => {
  return api.post("http://localhost:5500/api/activate", data);
};
export const logout = () =>{
  return api.post("http://localhost:5500/api/logout");
}

// interceptor
api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (err) => {
    const originalRequest = err.config;
    if (err.response.status == 401 && err.config && !err.config._isRetry) {
      originalRequest.isRetry = true;
      try {
        const response = await axios.get(
          "http://localhost:5500/api/refresh",
          {
            withCredentials: true,
          }
        );

        return axios.request(originalRequest);
      } catch (err) {
        console.log(err)
        console.log("Error in interceptor..");
      }
    }
  }
);
export default api;
