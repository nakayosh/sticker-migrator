import { connect } from 'react-redux';
import { submitSearchStpacks } from '../actions/search_stpacks';
import SearchStpacks from '../components/search_stpacks';

const mapStateToProps = state => ({
  results: state.getIn(['search_stpacks', 'results']),
  submitted: state.getIn(['search_stpacks', 'submitted']),
});

const mapDispatchToProps = dispatch => ({

  onScroll() {
    dispatch(submitSearchStpacks());
  },

});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchStpacks);
