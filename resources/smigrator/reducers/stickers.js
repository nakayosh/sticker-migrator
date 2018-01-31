import { List as ImmutableList, fromJS } from 'immutable';
import { STICKER_FETCH_SUCCESS } from '../actions/stickers';
import {
  STPACK_FETCH_SUCCESS,
  STPACK_UPDATE_SUCCESS,
} from '../actions/stpacks';

function normalizeSticker(state, sticker) {
  sticker = { ...sticker };

  sticker.id = sticker.id.toString();

  delete sticker.id_str;
  delete sticker.stpack_id;
  delete sticker.stpack_id_str;
  delete sticker.created_at;
  delete sticker.updated_at;

  return state.set(sticker.id, fromJS(sticker));
}

function normalizeStickers(state, stickers) {
  stickers.forEach(sticker => {
    state = normalizeSticker(state, sticker);
  });

  return state;
}

function normalizeStickerFromStpack(state, stpack) {
  state = normalizeStickers(state, stpack.stickers);

  return state;
}

const initialState = ImmutableList();

export default function sitckers(state = initialState, action) {
  switch(action.type) {
  case STICKER_FETCH_SUCCESS:
    return normalizeSticker(state, action.sticker);
  case STPACK_FETCH_SUCCESS:
  case STPACK_UPDATE_SUCCESS:
    return normalizeStickerFromStpack(state, action.stpack);
  default:
    return state;
  }
}
