import { Map as ImmutableMap } from 'immutable';
import {
  STPACK_PATCH_REQUEST,
  STPACK_PATCH_SUCCESS,
  STPACK_PATCH_FAIL,
} from '@/actions/stpacks';
import {
  STICKER_EXPAND_EMOJI_PICKER,
  STICKER_CLOSE_EMOJI_PICKER,
} from '@/actions/stickers';

const initialState = ImmutableMap({
  stickerId: null,
  submitting: false,
});

export default function compose(state = initialState, action) {
  switch(action.type) {
  case STICKER_EXPAND_EMOJI_PICKER:
    return state.set('stickerId', action.id);
  case STICKER_CLOSE_EMOJI_PICKER:
    return state.set('stickerId', null);
  case STPACK_PATCH_REQUEST:
    return state.set('submitting', true);
  case STPACK_PATCH_SUCCESS:
  case STPACK_PATCH_FAIL:
    return state.set('submitting', false);
  default:
    return state;
  }
}
