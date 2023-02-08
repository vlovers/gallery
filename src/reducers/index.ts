import { combineReducers } from "redux";

import photos, { IPhotosState } from "./photosReducer";

export interface ReduxState {
  photos: IPhotosState;
}

export default combineReducers({
  photos,
});
