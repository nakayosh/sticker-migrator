import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { patchStpack } from '@/actions/stpacks';
import { appendEmojiToSticker } from '@/actions/stickers';
import Compose from '@/features/stpacks/components/compose';

const mapStateToProps = (state, { stpack }) => ({
  currentId: state.getIn(['emoji_picker', 'currentId']),
  stickers: stpack.get('stickers').map(sticker => state.getIn(['stickers', sticker])),
  submitting: state.getIn(['compose', 'submitting']),
});

const mapDispatchToProps = (dispatch, { stpack }) => ({

  onPatch() {
    dispatch(patchStpack(stpack.get('id_str')));
  },

  onAppend(currentId, emoji) {
    dispatch(appendEmojiToSticker(currentId, emoji));
  },

});

export default injectIntl(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Compose));
