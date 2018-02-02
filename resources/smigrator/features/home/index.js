import React from 'react';

import Page from '../app/components/page';
import Content from '../app/components/content';

import GeneralHeader from '../general_header';
import WizardContainer from '../../containers/wizard_container';
import DiscoverStpacks from '../../containers/discover_stpacks_container';

export default class Home extends React.PureComponent {

  render () {
    return (
      <Page>
        <GeneralHeader />

        <Content>
          <WizardContainer />
          <DiscoverStpacks />
        </Content>
      </Page>
    );
  }

}
