import { connect } from 'react-redux';
import {
  refreshRecentStpacks,
  expandRecentStpacks,
} from '@/actions/recent_stpacks';
import RecentStpacks from '@/components/recent_stpacks';

const mapStateToProps = state => ({
  results: state.getIn(['recent_stpacks', 'results']),
  hasMore: state.getIn(['recent_stpacks', 'next']) !== null,
  submitting: state.getIn(['recent_stpacks', 'submitting']),
});

const mapDispatchToProps = dispatch => ({

  onRefresh () {
    dispatch(refreshRecentStpacks());
  },

  onExpand () {
    dispatch(expandRecentStpacks());
  },

});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RecentStpacks);
