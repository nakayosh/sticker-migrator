import React from 'react';
import Page from '@/features/app/components/page';
import Content from '@/features/app/components/content';
import GeneralHeader from '@/features/general_header';
import RecentStpacksContainer from '@/features/recent_stpacks/containers/recent_stpacks_container';

export default class RecentStpacks extends React.PureComponent {

  render () {
    return (
      <Page>
        <GeneralHeader />

        <Content>
          <RecentStpacksContainer />
        </Content>
      </Page>
    );
  }

}
