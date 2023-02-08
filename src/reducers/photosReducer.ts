import produce from "immer";

import { ReduxAction } from "../dto/static-types.dto";
import { PhotoDto } from "../dto/photo.dto";
import _ from "lodash";

export type IPhotosAction =
    IPhotosFetchStart
  | IPhotosFetchSuccess
  | IPhotosFetchFailed
  | IPhotosSetData;

export enum usersActionType {
  fetchStart = "users/fetchStart",
  fetchSuccess = "users/FetchSuccess",
  fetchFailed = "users/FetchFailed",
  setPhotos = "users/setPhotos",
}

interface IPhotosFetchSuccess extends ReduxAction {
  type: usersActionType.fetchSuccess;
}
interface IPhotosFetchStart extends ReduxAction {
  type: usersActionType.fetchStart;
}

interface IPhotosFetchFailed extends ReduxAction {
  type: usersActionType.fetchFailed;
}

interface IPhotosSetData extends ReduxAction {
  type: usersActionType.setPhotos;
  payload: {
    data: PhotoDto[];
  };
}


export const PhotosActions = {
  fetchStart: (): IPhotosAction => ({
    type: usersActionType.fetchStart,
  }),
  fetchSuccess: (): IPhotosAction => ({
    type: usersActionType.fetchSuccess,
  }),
  fetchFailed: (): IPhotosAction => ({
    type: usersActionType.fetchFailed,
  }),
  setPhotos: (photos: PhotoDto[]): IPhotosAction => ({
    type: usersActionType.setPhotos,
    payload: {
      data: photos,
    },
  }),
};

export interface IPhotosState {
  photos: PhotoDto[];
  page: number;
  loading: boolean;
}

const initialState: IPhotosState = {
  photos: [],
  page: 1,
  loading: false,
};

const photosReducer = (
  prevState = initialState,
  action: IPhotosAction
): IPhotosState =>
  produce(prevState, (draft: IPhotosState): IPhotosState => {
    switch (action.type) {
      case usersActionType.fetchStart:
        draft.loading = true;
        break;
      case usersActionType.fetchSuccess:
        draft.loading = false;
        break;
      case usersActionType.fetchFailed:
        draft.loading = false;
        break;
      case usersActionType.setPhotos:
        draft.loading = false;
        draft.page = draft.page + 1
        // api returns duplicates
        draft.photos = _.uniqBy([...draft.photos, ...action.payload.data], 'id');
        break;
      default:
        return draft;
    }
    return draft;
  });
export default photosReducer;
