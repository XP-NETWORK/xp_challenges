import axios from "axios";

export const axiosInstance = (baseUrl: string) =>
  axios.create({
    baseURL: baseUrl,
  });

