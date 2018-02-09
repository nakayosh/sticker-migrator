import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import ImmutablePureComponent from 'react-immutable-pure-component';
import {
  fetchStpack,
  connectStpack,
  disconnectStpack,
} from '@/actions/stpacks';

import Page from '@/features/app/components/page';
import Content from '@/features/app/components/content';
import GeneralHeader from '@/features/general_header';
import LoadingIndicator from '@/components/loading_indicator';
import StpackContainer from '@/features/stpacks/containers/stpack_container';
// import StpackProgressContainer from '@/features/stpacks/containers/stpack_progress_container';
import StpackComposeContainer from '@/features/stpacks/containers/stpack_compose_container';

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
    this.props.dispatch(connectStpack(this.props.match.params.id));

    if ( !this.props.stpack ) {
      this.props.dispatch(fetchStpack(this.props.match.params.id));
    }
  }

  componentWillUnmount () {
    this.props.dispatch(disconnectStpack(this.props.match.params.id));
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

  renderContent (id, status) {
    switch(status) {
    case 'downloaded':
      return <StpackComposeContainer id={id} />;
    case 'compiling':
    case 'uploading':
    case 'uploaded':
      return <StpackContainer id={id} />;
    case 'failed':
    default:
      return (
        <div>Unexpected error occured</div>
      );
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
          { this.renderContent(id, status) }
        </Content>
      </Page>
    );
  }

}
