import {
  MESSAGE_SHOW,
  MESSAGE_CLOSE,
} from '@/actions/message';

import { Map as ImmutableMap } from 'immutable';

const initialState = ImmutableMap({
  show: false,
  text: '',
  time: 5000,
});

export default function message(state = initialState, action) {
  switch(action.type) {
  case MESSAGE_SHOW:
    return state
      .set('show', true)
      .set('text', action.messageProps.text)
      .set('time', action.messageProps.time || 5000);
  case MESSAGE_CLOSE:
    return state.set('show', false);
  default:
    return state;
  }
}
