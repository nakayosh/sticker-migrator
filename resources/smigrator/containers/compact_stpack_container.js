import { connect } from 'react-redux';
import CompactStpack from '@/components/compact_stpack';

const mapStateToProps = (state, { id }) => ({
  stpack: state.getIn(['stpacks', id]),
});

export default connect(
  mapStateToProps,
)(CompactStpack);
