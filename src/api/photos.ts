import httpClient from "./apiClient";
import axios from "axios/index";
import { PhotoDto } from "../dto/photo.dto";

interface IAuthApiUrls {
  photos: string;
}
export const AUTH_API_URLS: IAuthApiUrls = {
  photos: "/photos",
};

export const getPhotosRequest = (page: number): Promise<{data: PhotoDto[]}> =>
  httpClient.get(`${AUTH_API_URLS.photos}?page=${page}`);
