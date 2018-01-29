import { connect } from 'react-redux';
import Stpack from '../components/stpack';

const mapStateToProps = (state, { id }) => ({
  stpack: state.get(['stpack', id]),
});

// const mapDispatchToProps = dispatch => ({
// });

export default connect(
  mapStateToProps,
  // mapDispatchToProps,
)(Stpack);
