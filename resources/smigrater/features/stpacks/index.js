import React from 'react';
import PropTypes from 'prop-types';

import Page from '../app/components/page';
import Content from '../app/components/content';
import GeneralHeader from '../general_header';

import StpackContainer from './containers/stpack_container';

export default class Stpacks extends React.PureComponent {

  static propTypes = {
    match: PropTypes.object,
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
