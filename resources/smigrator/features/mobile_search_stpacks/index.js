import React from 'react';

import Page from '../app/components/page';
import Content from '../app/components/content';

import GeneralHeader from '../general_header';
import SearchStpacks from '../search_stpacks';

export default class MobileHome extends React.PureComponent {

  render () {
    return (
      <Page>
        <GeneralHeader />

        <Content>
          <SearchStpacks />
        </Content>
      </Page>
    );
  }

}
