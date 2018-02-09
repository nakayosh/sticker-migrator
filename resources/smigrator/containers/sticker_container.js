import { connect } from 'react-redux';
import { openModal } from '@/actions/modal';
import Sticker from '@/components/sticker';

const mapStateToProps = (state, { stickerId }) => ({
  sticker: state.getIn(['stickers', stickerId]),
});

const mapDispatchToProps = (dispatch, { stickerId }) => ({

  onOpenModal() {
    dispatch(openModal('STICKER_PREVIEW_MODAL', { stickerId }));
  },

});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Sticker);
