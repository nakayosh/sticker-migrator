import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { patchStpack } from '@/actions/stpacks';
import {
  appendStickerEmoji,
  closeStickerEmojiPicker,
} from '@/actions/stickers';
import Compose from '@/features/stpacks/components/compose';

const mapStateToProps = (state) => ({
  stickerId: state.getIn(['compose', 'stickerId']),
  targetNode: state.getIn(['compose', 'targetNode']),
  // submittable: stpack.get('stickers').size === stpack.get('stickers').filter(stickerId => state.getIn(['stickers', stickerId, 'emojis']).size > 0),
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
