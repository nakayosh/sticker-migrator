import { connect } from 'react-redux';
import { fetchRecentStpacks } from '../actions/recent_stpacks';
import RecentStpacks from '../components/recent_stpacks';

const mapStateToProps = state => ({
  results: state.getIn(['recent_stpacks', 'results']),
  isSubmitting: state.getIn(['recent_stpacks', 'submitting']),
});

const mapDispatchToProps = dispatch => ({

  onScroll() {
    dispatch(fetchRecentStpacks());
  },

});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RecentStpacks);
