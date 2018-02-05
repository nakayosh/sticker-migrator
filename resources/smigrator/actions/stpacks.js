import api from '../api';
import echo from 'laravel-echo';

export const STPACK_FETCH_REQUEST = 'STPACK_FETCH_REQUEST';
export const STPACK_FETCH_SUCCESS = 'STPACK_FETCH_SUCCESS';
export const STPACK_FETCH_FAIL    = 'STPACK_FETCH_FAIL';

export const STPACK_UPDATE = 'STPACK_UPDATE';

export const STPACK_PATCH_REQUEST = 'STPACK_PATCH_REQUEST';
export const STPACK_PATCH_SUCCESS = 'STPACK_PATCH_SUCCESS';
export const STPACK_PATCH_FAIL    = 'STPACK_PATCH_FAIL';

export function fetchStpack(id) {
  return (dispatch, getState) => {
    dispatch(fetchStpackRequest(id));

    api(getState).get(`/api/stpacks/${id}`).then(responce => {
      dispatch(fetchStpackSuccess(responce.data));
    }).catch(error => {
      dispatch(fetchStpackFail(error));
    });
  };
}

export function fetchStpackRequest(id) {
  return {
    type: STPACK_FETCH_REQUEST,
    id,
  };
}

export function fetchStpackSuccess(stpack) {
  return {
    type: STPACK_FETCH_SUCCESS,
    stpack,
  };
}

export function fetchStpackFail(error) {
  return {
    type: STPACK_FETCH_FAIL,
    error,
  };
}


export function updateStpack(stpack) {
  return {
    type: STPACK_UPDATE,
    stpack,
  };
}


export function patchStpack(id) {
  return (dispatch, getState) => {
    dispatch(patchStpackRequest(id));

    const data = {};

    data.stickers = getState().getIn(['stpacks', id, 'stickers']).map(stickerId => {
      return getState().getIn(['stickers', stickerId]).toJS();
    });

    api(getState).patch(`/api/stpacks/${id}`, data).then(response => {
      dispatch(patchStpackRequest(response.data));

      const echo = new echo({
        broadcaster: 'socket.io',
        host: window.location.hostname + ':4000',
      });

      echo.private(`stpacks-${id}`).listen('StickerComlileStarting', e => console.log(e));
      echo.private(`stpacks-${id}`).listen('StickerCompiling',       e => console.log(e));
      echo.private(`stpacks-${id}`).listen('StickerCompiled',        e => console.log(e));
      echo.private(`stpacks-${id}`).listen('StickerUploadStarting',  e => console.log(e));
      echo.private(`stpacks-${id}`).listen('StickerUploading',       e => console.log(e));
      echo.private(`stpacks-${id}`).listen('StickerUploaded',        e => console.log(e));
      echo.private(`stpacks-${id}`).listen('StickerUploadFailed',    e => console.log(e));
    }).catch(error => {
      dispatch(patchStpackFail(error));
    });
  };
}

export function patchStpackRequest(data) {
  return {
    type: STPACK_PATCH_REQUEST,
    data,
  };
}

export function patchStpackSuccess(stpack) {
  return {
    type: STPACK_PATCH_SUCCESS,
    stpack,
  };
}

export function patchStpackFail(error) {
  return {
    type: STPACK_PATCH_FAIL,
    error,
  };
}
