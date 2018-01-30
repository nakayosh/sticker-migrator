import api from '../api';

export const STICKER_FETCH_REQUEST = 'STICKER_FETCH_REQUEST';
export const STICKER_FETCH_SUCCESS = 'STICKER_FETCH_SUCCESS';
export const STICKER_FETCH_FAIL = 'STICKER_FETCH_FAIL';

export function fetchSticker(id) {
  return (dispatch, getState) => {
    dispatch(fetchStickerRequest(id));

    api(getState).get(`/api/stickers/${id}`).then(response => {
      dispatch(fetchStickerSuccess(response.data));
    }).catch(error => {
      dispatch(fetchStickerFail(error));
    });
  };
}

export function fetchStickerRequest(id) {
  return {
    type: STICKER_FETCH_REQUEST,
    id,
  };
}

export function fetchStickerSuccess(sticker) {
  return {
    type: STICKER_FETCH_SUCCESS,
    sticker,
  };
}

export function fetchStickerFail(error) {
  return {
    type: STICKER_FETCH_FAIL,
    error,
  };
}
