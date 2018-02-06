import { connect } from 'react-redux';
import {
  changeStickerEmoji,
  expandStickerEmojiPicker,
} from '../actions/stickers';
import StickerEmojiSelector from '../components/sticker_emoji_selector';

const mapStateToProps = (state, { stickerId }) => ({
  sticker: state.getIn(['stickers', stickerId]),
});

const mapDispatchToProps = (dispatch, { stickerId }) => ({

  onChangeEmoji(emoji) {
    dispatch(changeStickerEmoji(stickerId, emoji));
  },

  onExpandEmojiPicker(targetNode) {
    dispatch(expandStickerEmojiPicker(targetNode));
  },

});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StickerEmojiSelector);
