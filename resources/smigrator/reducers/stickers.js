import { List as ImmutableList, fromJS } from 'immutable';
import { STICKER_FETCH_SUCCESS } from '../actions/stickers';
import {
  STPACK_FETCH_SUCCESS,
  STPACK_UPDATE_SUCCESS,
} from '../actions/stpacks';

function normalizeSticker(state, sticker) {
  sticker = { ...sticker };

  return state.set(sticker.id_str, fromJS(sticker));
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
