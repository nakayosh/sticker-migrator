import { connect } from 'react-redux';
import { fetchStpack } from '../actions/stpacks';
import Wizard from '../components/wizard';

const mapStateToProps = state => ({
  value: state.getIn(['wizard', 'value']),
});

const mapDispatchToProps = dispatch => ({

  onSubmit(value) {
    const id = value.split('/')[5];

    if (id) {
      dispatch(fetchStpack(id));
    }
  },

});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Wizard);
