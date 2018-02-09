import { connect } from 'react-redux';
import SearchStpacks from '@/features/search_stpacks/components/search_stpacks';

const mapStateToProps = state => ({
  value: state.getIn(['search_stpacks', 'value']),
  results: state.getIn(['search_stpacks', 'results']),
  hasMore: state.getIn(['search_stpacks', 'next']) !== null,
  submitting: state.getIn(['search_stpacks', 'submitting']),
});

export default connect(
  mapStateToProps,
)(SearchStpacks);
