
export const EXPAND_EMOJI_PICKER = 'EXPAND_EMOJI_PICKER';
export const CLOSE_EMOJI_PICKER  = 'CLOSE_EMOJI_PICKER';

export function expandEmojiPicker(id) {
  return {
    type: EXPAND_EMOJI_PICKER,
    id,
  };
}

export function closeEmojiPicker() {
  return {
    type: CLOSE_EMOJI_PICKER,
  };
}
