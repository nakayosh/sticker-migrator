import React from 'react';

import Page from '../app/components/page';
import Content from '../app/components/content';

import GeneralHeader from '../general_header';
import RecentStpacks from '../recent_stpacks';

export default class MobileRecentStpacks extends React.PureComponent {

  render () {
    return (
      <Page>
        <GeneralHeader />

        <Content>
          <RecentStpacks />
        </Content>
      </Page>
    );
  }

}
