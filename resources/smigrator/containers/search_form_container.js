import { connect } from 'react-redux';
import {
  changeSearchStpacks,
  clearSearchStpacks,
} from '@/actions/search_stpacks';
import SeachForm from '@/components/search_form';

const mapStateToProps = state => ({
  value: state.getIn(['search_stpacks', 'value']),
  submitted: state.getIn(['search_stpacks', 'submitted']),
});

const mapDispatchToProps = dispatch => ({

  onChange(value) {
    dispatch(changeSearchStpacks(value));
  },

  onClear() {
    dispatch(clearSearchStpacks());
  },

});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SeachForm);
