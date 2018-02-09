import React from 'react';
import Page from '@/features/app/components/page';
import Content from '@/features/app/components/content';
import GeneralHeader from '@/features/general_header';
import WizardContainer from '@/features/home/containers/wizard_container';
import RecentStpacks from '@/features/recent_stpacks/containers/recent_stpacks_container';
import Maintainers from '@/components/maintainers';

export default class Home extends React.PureComponent {

  render () {
    return (
      <Page>
        <GeneralHeader />

        <Content>
          <WizardContainer />
          <RecentStpacks />
          <Maintainers />
        </Content>
      </Page>
    );
  }

}
