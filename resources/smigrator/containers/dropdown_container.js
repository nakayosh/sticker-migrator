import { connect } from 'react-redux';
import Dropdown from '../components/dropdown';
import { isUserTouching } from '../is_mobile';
import { openModal, closeModal } from '../actions/modal';

const mapStateToProps = state => ({
  isModalOpen: state.get('modal').modalType === 'ACTIONS',
});

const mapDispatchToProps = dispatch => ({
  isUserTouching,
  onModalOpen: props => dispatch(openModal('ACTIONS', props)),
  onModalClose: () => dispatch(closeModal()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Dropdown);
