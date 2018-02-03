import React from 'react';

import Page from '../app/components/page';
import Content from '../app/components/content';

import GeneralHeader from '../general_header';
import WizardContainer from '../../containers/wizard_container';
import RecentStpacks from '../recent_stpacks';

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
