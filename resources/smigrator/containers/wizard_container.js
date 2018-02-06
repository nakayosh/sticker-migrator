import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { injectIntl } from 'react-intl';
import Wizard from '../components/wizard';

const mapStateToProps = state => ({
  value: state.getIn(['wizard', 'value']),
});

const mapDispatchToProps = (dispatch, { history }) => ({

  onSubmit(value) {
    const id = value.split('/')[5];

    if (id) {
      history.push(`/stpacks/${id}`);
      // dispatch(fetchStpack(id));
    }
  },

});

export default injectIntl(withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Wizard)));
