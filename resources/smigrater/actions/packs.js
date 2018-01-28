import api from '../api';

export const PACK_FETCH_REQUEST = 'PACK_FETCH_REQUEST';
export const PACK_FETCH_SUCCESS = 'PACK_FETCH_SUCCESS';
export const PACK_FETCH_FAIL    = 'PACK_FETCH_FAIL';

export function fetchPack(id) {
  return (getState, dispatch) => {
    dispatch(fetchPackRequest(id));

    api(getState).get(`/api/packs/${id}`).then(responce => {
      dispatch(fetchPackSuccess(responce.data));
    }).catch(error => {
      dispatch(fetchPackFail(error));
    });
  };
}

export function fetchPackRequest(id) {
  return {
    type: PACK_FETCH_REQUEST,
    id,
  };
}

export function fetchPackSuccess(pack) {
  return {
    type: PACK_FETCH_SUCCESS,
    pack,
  };
}

export function fetchPackFail(error) {
  return {
    type: PACK_FETCH_FAIL,
    error,
  };
}
