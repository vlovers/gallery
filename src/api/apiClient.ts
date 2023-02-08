import axios, { AxiosInstance } from "axios";

const apiClient: AxiosInstance = axios.create({
  baseURL: 'https://api.unsplash.com',
  headers: {
    Authorization: `Client-ID joYXnDTY_j7B2_9cgfTvIYJY6g5bxtwD7VUqAYfD5Ck`,
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Headers": "x-requested-with, x-requested-by",
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS,DELETE,PUT",
    "Access-Control-Allow-Origin": "*",
  },
});

export default apiClient;
