import { Map as ImmutableMap, fromJS } from 'immutable';
import {
  STICKER_FETCH_SUCCESS,
  STICKER_APPEND_EMOJI,
  STICKER_REMOVE_EMOJI,
} from '@/actions/stickers';
import {
  STPACK_FETCH_SUCCESS,
  STPACK_UPDATE,
} from '@/actions/stpacks';
import {
  RECENT_STPACKS_REFRESH_SUCCESS,
  RECENT_STPACKS_EXPAND_SUCCESS,
} from '@/actions/recent_stpacks';
import {
  SEARCH_STPACKS_REFRESH_SUCCESS,
  SEARCH_STPACKS_EXPAND_SUCCESS,
} from '@/actions/search_stpacks';
import { STORE_HYDRATE } from '@/actions/store';

const normalizeSticker = (state, sticker) => {
  sticker = { ...sticker };

  sticker.created_at = sticker.created_at.replace(/-/g, '/');
  sticker.updated_at = sticker.updated_at.replace(/-/g, '/');

  return state.set(sticker.id_str, fromJS(sticker));
};

const normalizeStickers = (state, stickers) => {
  stickers.forEach(sticker => {
    state = normalizeSticker(state, sticker);
  });

  return state;
};

const normalizeStickerFromStpack = (state, stpack) => {
  state = normalizeStickers(state, stpack.stickers);

  return state;
};

const normalizeStickerFromStpackList = (state, stpackList) => {
  stpackList.results.forEach(stpack => {
    state = normalizeStickerFromStpack(state, stpack);
  });

  return state;
};

const appendEmoji = (state, id, emoji) => {
  return state.withMutations(map => {
    if (!map.getIn([id, 'emojis']).includes(emoji)) {
      map.updateIn([id, 'emojis'], emojis => emojis.concat(emoji));
    }
  });
};

const initialState = ImmutableMap();

export default function stickers(state = initialState, action) {
  switch(action.type) {
  case STORE_HYDRATE:
    return state.merge(action.state.get('stickers'));
  case STICKER_APPEND_EMOJI:
    return appendEmoji(state, action.id, action.emoji);
  case STICKER_REMOVE_EMOJI:
    return state.removeIn([action.id, 'emojis', action.index]);
  case STICKER_FETCH_SUCCESS:
    return normalizeSticker(state, action.sticker);
  case STPACK_FETCH_SUCCESS:
  case STPACK_UPDATE:
    return normalizeStickerFromStpack(state, action.stpack);
  case RECENT_STPACKS_REFRESH_SUCCESS:
  case RECENT_STPACKS_EXPAND_SUCCESS:
  case SEARCH_STPACKS_REFRESH_SUCCESS:
  case SEARCH_STPACKS_EXPAND_SUCCESS:
    return normalizeStickerFromStpackList(state, action.stpackList);
  default:
    return state;
  }
}
