import { connect } from 'react-redux';
import Bundle from '@/features/app/components/bundle';
import {
  fetchBundleRequest,
  fetchBundleSuccess,
  fetchBundleFail
} from '@/actions/bundles';

const mapDispatchToProps = dispatch => ({
  onFetch () {
    dispatch(fetchBundleRequest());
  },
  onFetchSuccess () {
    dispatch(fetchBundleSuccess());
  },
  onFetchFail (error) {
    dispatch(fetchBundleFail(error));
  },
});

export default connect(null, mapDispatchToProps)(Bundle);
