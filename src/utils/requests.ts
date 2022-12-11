import axios from "axios";
const ENDPOINT = process.env.REACT_APP_ENDPOINT
const instance = axios.create({
  baseURL: ENDPOINT || "localhost:3000",
});

export const getMethod = (url: string) => {
  return instance.get(url);
};

export const postMethod = (url: string, object: unknown) => {
  return instance.post(url, object);
};
