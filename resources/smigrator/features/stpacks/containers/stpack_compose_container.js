import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { patchStpack } from '@/actions/stpacks';
import {
  appendStickerEmoji,
  expandStickerEmojiPicker,
  hideStickerEmojiPicker,
} from '@/actions/stickers';
import StpackCompose from '@/features/stpacks/components/stpack_compose';

const mapStateToProps = state => ({
  targetNode: state.getIn(['stpack_compose', 'targetNode']),
});

const mapDispatchToProps = (dispatch, { id }) => ({

  onPatch() {
    dispatch(patchStpack(id));
  },

  onExpand(node) {
    dispatch(expandStickerEmojiPicker(node));
  },

  onHide() {
    dispatch(hideStickerEmojiPicker());
  },

  onAppendStickerEmoji(stickerId, emoji) {
    dispatch(appendStickerEmoji(stickerId, emoji));
  },

});

export default injectIntl(connect(
  mapStateToProps,
  mapDispatchToProps,
)(StpackCompose));
