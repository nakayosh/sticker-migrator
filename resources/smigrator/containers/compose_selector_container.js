import { connect } from 'react-redux';
import { expandEmojiPicker } from '@/actions/emoji_picker';
import { removeEmojiFromSticker } from '@/actions/stickers';
import ComposeSelector from '@/components/compose_selector';

const mapStateToProps = (state, { stickerId }) => ({
  sticker: state.getIn(['stickers', stickerId]),
});

const mapDispatchToProps = (dispatch, { stickerId }) => ({

  onExpand() {
    dispatch(expandEmojiPicker(stickerId));
  },

  onRemove(id, index) {
    dispatch(removeEmojiFromSticker(id, index));
  },

});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ComposeSelector);
