import React from 'react';
import Page from '@/features/app/components/page';
import Content from '@/features/app/components/content';
import GeneralHeader from '@/features/general_header';
import RecentStpacks from '@/features/recent_stpacks/containers/recent_stpacks_container';

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
