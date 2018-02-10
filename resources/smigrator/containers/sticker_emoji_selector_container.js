import { connect } from 'react-redux';
import {
  expandStickerEmojiPicker,
  removeStickerEmoji,
} from '@/actions/stickers';
import StickerEmojiSelector from '@/components/sticker_emoji_selector';

const mapStateToProps = (state, { stickerId }) => ({
  sticker: state.getIn(['stickers', stickerId]),
});

const mapDispatchToProps = (dispatch, { stickerId }) => ({

  onRemove(id, index) {
    dispatch(removeStickerEmoji(id, index));
  },

  onExpand() {
    dispatch(expandStickerEmojiPicker(stickerId));
  },

});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StickerEmojiSelector);
