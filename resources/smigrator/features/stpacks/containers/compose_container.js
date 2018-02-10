import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { patchStpack } from '@/actions/stpacks';
import {
  appendStickerEmoji,
  closeStickerEmojiPicker,
} from '@/actions/stickers';
import Compose from '@/features/stpacks/components/compose';

const mapStateToProps = (state, { stpack }) => ({
  stickerId: state.getIn(['compose', 'stickerId']),
  targetNode: state.getIn(['compose', 'targetNode']),
  includedStickers: stpack.get('stickers').map(stickerId => state.getIn(['stickers', stickerId])),
});

const mapDispatchToProps = (dispatch, { stpack }) => ({

  onPatch() {
    dispatch(patchStpack(stpack.get('id_str')));
  },

  onClose() {
    dispatch(closeStickerEmojiPicker());
  },

  onAppend(stickerId, emoji) {
    dispatch(appendStickerEmoji(stickerId, emoji));
  },

});

export default injectIntl(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Compose));
