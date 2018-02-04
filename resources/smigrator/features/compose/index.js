import React from 'react';

import Page from '../app/components/page';
import Content from '../app/components/content';

import GeneralHeader from '../general_header';

export default class Home extends React.PureComponent {

  render () {
    return (
      <Page>
        <GeneralHeader />

        <Content>
          Compose
        </Content>
      </Page>
    );
  }

}
