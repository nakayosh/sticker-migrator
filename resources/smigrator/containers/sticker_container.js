import { connect } from 'react-redux';
import Sticker from '../components/sticker';

const mapStateToProps = (state, { stickerId }) => ({
  sticker: state.getIn(['stickers', stickerId]),
});

export default connect(
  mapStateToProps,
)(Sticker);
