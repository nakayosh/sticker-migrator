import { Map as ImmutableMap } from 'immutable';
import {
  STPACK_PATCH_REQUEST,
  STPACK_PATCH_SUCCESS,
  STPACK_PATCH_FAIL,
} from '@/actions/stpacks';
import {
  STICKER_EXPAND_EMOJI_PICKER,
  STICKER_HIDE_EMOJI_PICKER,
} from '@/actions/stickers';

const initialState = ImmutableMap({
  targetNode: null,
  submitting: false,
});

export default function stpack_compose(state = initialState, action) {
  switch(action.type) {
  case STICKER_EXPAND_EMOJI_PICKER:
    return state.set('targetNode', action.node);
  case STICKER_HIDE_EMOJI_PICKER:
    return state.set('targetNode', null);
  case STPACK_PATCH_REQUEST:
    return state.set('submitting', true);
  case STPACK_PATCH_SUCCESS:
  case STPACK_PATCH_FAIL:
    return state.set('submitting', false);
  default:
    return state;
  }
}
