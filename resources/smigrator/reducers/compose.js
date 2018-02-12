import { Map as ImmutableMap } from 'immutable';
import {
  STPACK_PATCH_REQUEST,
  STPACK_PATCH_SUCCESS,
  STPACK_PATCH_FAIL,
} from '@/actions/stpacks';

const initialState = ImmutableMap({
  submitting: false,
});

export default function compose(state = initialState, action) {
  switch(action.type) {
  case STPACK_PATCH_REQUEST:
    return state.set('submitting', true);
  case STPACK_PATCH_SUCCESS:
  case STPACK_PATCH_FAIL:
    return state.set('submitting', false);
  default:
    return state;
  }
}
