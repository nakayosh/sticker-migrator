export const LOCALE_CHANGE = 'LOCALE_CHANGE';

export function changeLocale(data) {
  return {
    type: LOCALE_CHANGE,
    data,
  };
};
