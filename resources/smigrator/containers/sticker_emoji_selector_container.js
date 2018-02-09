import { connect } from 'react-redux';
import {
  appendStickerEmoji,
  expandStickerEmojiPicker,
} from '@/actions/stickers';
import StickerEmojiSelector from '@/components/sticker_emoji_selector';

const mapStateToProps = (state, { stickerId }) => ({
  sticker: state.getIn(['stickers', stickerId]),
});

const mapDispatchToProps = (dispatch, { stickerId }) => ({

  onChangeEmoji(emoji) {
    dispatch(appendStickerEmoji(stickerId, emoji));
  },

  onExpandEmojiPicker(targetNode) {
    dispatch(expandStickerEmojiPicker(targetNode));
  },

});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StickerEmojiSelector);
