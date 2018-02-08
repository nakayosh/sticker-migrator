import { Map as ImmutableMap } from 'immutable';
import { LOCALE_CHANGE } from '@/actions/settings';

const supportedLocales = ['en', 'ja'];

const initialLocale = () => {
  const lang = navigator.language.split('-')[0];

  if (supportedLocales.indexOf(lang) !== -1) {
    return lang;
  } else {
    return 'en';
  }
};

const initialState = ImmutableMap({
  locale: initialLocale(),
});

export default function settings(state = initialState, action) {
  switch(action.type) {
  case LOCALE_CHANGE:
    return state.set('locale', action.data);
  default:
    return state;
  }
}
