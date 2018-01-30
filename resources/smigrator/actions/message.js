export const MESSAGE_SHOW  = 'MESSAGE_SHOW';
export const MESSAGE_HIDE  = 'MESSAGE_HIDE';

export function showMessage(props) {
  return {
    type: MESSAGE_SHOW,
    messageProps: props,
  };
}

export function hideMessage() {
  return {
    type: MESSAGE_HIDE,
  };
}
