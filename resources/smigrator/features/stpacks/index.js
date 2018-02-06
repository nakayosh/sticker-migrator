import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import ImmutablePureComponent from 'react-immutable-pure-component';
import { fetchStpack } from '../../actions/stpacks';

import Page from '../app/components/page';
import Content from '../app/components/content';
import GeneralHeader from '../general_header';
import LoadingIndicator from '../../components/loading_indicator';
import StpackContainer from '../../containers/stpack_container';
import StpackComposeContainer from '../../containers/stpack_compose_container';

const mapStateToProps = (state, { match }) => ({
  stpack: state.getIn(['stpacks', match.params.id]),
});

@connect(mapStateToProps)
export default class Stpacks extends ImmutablePureComponent {

  static propTypes = {
    stpack: ImmutablePropTypes.map,
    match: PropTypes.object,
    dispatch: PropTypes.func.isRequired,
  }

  componentWillMount () {
    if ( !this.props.stpack ) {
      this.props.dispatch(fetchStpack(this.props.match.params.id));
    }
  }

  _getStatus(status) {
    switch(status) {
    case 0:
      return 'downloaded';
    case 1:
      return 'compiling';
    case 2:
      return 'uploading';
    case 3:
      return 'uploaded';
    case 4:
      return 'failed';
    default:
      return 'unknown';
    }
  }

  render () {
    const { id } = this.props.match.params;
    const { stpack } = this.props;

    if ( !stpack ) {
      return <LoadingIndicator />;
    }

    const status = this._getStatus(stpack.get('status'));

    return (
      <Page>
        <GeneralHeader />

        <Content>
          {
            status === 'uploaded' ? (
              <StpackContainer id={id} />
            ) : (
              <StpackComposeContainer id={id} />
            )
          }
        </Content>
      </Page>
    );
  }

}
