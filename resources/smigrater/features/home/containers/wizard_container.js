import { connect } from 'react-redux';
import {
  changeWizard,
  submitWizard,
} from '../../../actions/wizard';
import Wizard from '../components/wizard';

const mapStateToProps = state => ({
  value: state.getIn(['wizard', 'value']),
});

const mapDispatchToProps = dispatch => ({

  onChange(value) {
    dispatch(changeWizard(value));
  },

  onSubmit() {
    dispatch(submitWizard());
  },

});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Wizard);
