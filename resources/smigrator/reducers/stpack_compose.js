import { Map as ImmutableMap } from 'immutable';
import {
  STICKER_EXPAND_EMOJI_PICKER,
} from '../actions/stickers';

const initialState = ImmutableMap({
  targetNode: null,
});

export default function stpack_compose(state = initialState, action) {
  switch(action.type) {
  case STICKER_EXPAND_EMOJI_PICKER:
    return state.set('targetNode', action.node);
  default:
    return state;
  }
}
