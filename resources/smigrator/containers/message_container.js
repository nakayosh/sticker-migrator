import { connect } from 'react-redux';
import { closeMessage } from '@/actions/message';
import Message from '@/components/message';

const mapStateToProps = state => ({
  show: state.getIn(['message', 'show']),
  text: state.getIn(['message', 'text']),
  time: state.getIn(['message', 'time']),
});

const mapDispatchToProps = dispatch => ({
  onClose() {
    dispatch(closeMessage());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Message);
