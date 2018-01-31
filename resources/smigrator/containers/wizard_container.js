import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { fetchStpack } from '../actions/stpacks';
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

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Wizard));
