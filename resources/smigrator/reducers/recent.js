import { Map as ImmutableMap, List as ImmutableList, fromJS } from 'immutable';

const initialState = ImmutableMap({
  'recent': ImmutableList(),
});

export default function recent(state = initialState, action) {
  switch(action.type) {

  }
}
