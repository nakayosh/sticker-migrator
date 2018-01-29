import React from 'react';
import PropTypes from 'prop-types';

import Page from '../app/components/page';
import Content from '../app/components/content';
import GeneralHeader from '../general_header';

export default class Stpacks extends React.PureComponent {

  render () {
    return (
      <Page>
        <GeneralHeader />
        <Content />
      </Page>
    );
  }

}
