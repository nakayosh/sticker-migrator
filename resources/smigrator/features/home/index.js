import React from 'react';
import Page from '@/features/app/components/page';
import Content from '@/features/app/components/content';
import GeneralHeader from '@/features/general_header';
import WizardContainer from '@/features/home/containers/wizard_container';
import RecentStpacks from '@/containers/recent_stpacks_container';

export default class Home extends React.PureComponent {

  render () {
    return (
      <Page>
        <GeneralHeader />

        <Content>
          <WizardContainer />
          <RecentStpacks />
        </Content>
      </Page>
    );
  }

}
