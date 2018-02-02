import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ImmutablePureComponent from 'react-immutable-pure-component';
import { fetchStpack } from '../../actions/stpacks';

import Page from '../app/components/page';
import Content from '../app/components/content';
import GeneralHeader from '../general_header';
import StpackContainer from '../../containers/stpack_container';

const mapStateToProps = (state, { match }) => ({
  stpack: state.getIn(['stpacks', match.params.id]),
});

@connect(mapStateToProps)
export default class Stpacks extends ImmutablePureComponent {

  static propTypes = {
    match: PropTypes.object,
    dispatch: PropTypes.func.isRequired,
  }

  componentWillMount () {
    if (!this.props.stpack) {
      this.props.dispatch(fetchStpack(this.props.match.params.id));
    }
  }

  render () {
    const { id } = this.props.match.params;

    return (
      <Page>
        <GeneralHeader />

        <Content>
          <StpackContainer id={id} />
        </Content>
      </Page>
    );
  }

}
