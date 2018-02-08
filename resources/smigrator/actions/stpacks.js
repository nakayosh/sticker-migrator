import api from '../api';
import Echo from 'laravel-echo';

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
  console.log(stpack);

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

      window.Echo = new Echo({
        broadcaster: 'socket.io',
        host: `${window.location.hostname}:4000`,
      });

      window.Echo.channel(`stpacks.${id}`)
        .listen('StickerComlileStarting', e => console.log(e))
        .listen('StickerCompiling',       e => console.log(e))
        .listen('StickerCompiled',        e => console.log(e))
        .listen('StickerUploadStarting',  e => console.log(e))
        .listen('StickerUploading',       e => console.log(e))
        .listen('StickerUploaded',        e => console.log(e))
        .listen('StickerUploadFailed',    e => console.log(e));

      // .listen('StickerComlileStarting', e => dispatch(updateStpack(e.data)))
      // .listen('StickerCompiling',       e => dispatch(updateStpack(e.data)))
      // .listen('StickerCompiled',        e => dispatch(updateStpack(e.data)))
      // .listen('StickerUploadStarting',  e => dispatch(updateStpack(e.data)))
      // .listen('StickerUploading',       e => dispatch(updateStpack(e.data)))
      // .listen('StickerUploaded',        e => dispatch(updateStpack(e.data)))
      // .listen('StickerUploadFailed',    e => dispatch(updateStpack(e.data)));
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
