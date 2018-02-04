import { connect } from 'react-redux';
import Stpack from '../components/stpack';

const mapStateToProps = (state, { id }) => ({
  stpack: state.getIn(['stpacks', id], null),
});

// const mapDispatchToProps = dispatch => ({
// });

export default connect(
  mapStateToProps,
)(Stpack);
