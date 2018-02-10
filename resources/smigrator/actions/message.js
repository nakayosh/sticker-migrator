export const MESSAGE_SHOW  = 'MESSAGE_SHOW';
export const MESSAGE_CLOSE  = 'MESSAGE_CLOSE';

export function showMessage(props) {
  return {
    type: MESSAGE_SHOW,
    messageProps: props,
  };
}

export function closeMessage() {
  return {
    type: MESSAGE_CLOSE,
  };
}
