import { Map as ImmutableMap } from 'immutable';
import {
  EXPAND_EMOJI_PICKER,
  CLOSE_EMOJI_PICKER,
} from '@/actions/emoji_picker';

const initialState = ImmutableMap({
  expanded: false,
  currentId: null,
});

export default function emojiPicker(state = initialState, action) {
  switch(action.type) {
  case EXPAND_EMOJI_PICKER:
    return state
      .set('expanded', true)
      .set('currentId', action.id);
  case CLOSE_EMOJI_PICKER:
    return state
      .set('expanded', false)
      .set('currentId', null);
  default:
    return state;
  }
}
