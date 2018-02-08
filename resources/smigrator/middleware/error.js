import { showMessage } from '@/actions/message';

const defaultFailSuffix = 'FAIL';

export default function errorsMiddleware() {
  return ({ dispatch }) => next => action => {
    if (action.type && !action.skipAlert) {
      const isFail = new RegExp(`${defaultFailSuffix}$`, 'g');

      if (action.type.match(isFail)) {
        if (action.error.response) {
          const { data, statusText } = action.error.response;

          let text = statusText;

          if (data.error) {
            text = data.error;
          }

          if (data.error_description) {
            text = data.error_description;
          }

          dispatch(showMessage({ text }));
        } else {
          console.error(action.error, action.type);
          dispatch(showMessage({ text: 'An unexpected error occurred.' }));
        }
      }
    }

    return next(action);
  };
};
