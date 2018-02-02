import React from 'react';

import Page from '../app/components/page';
import Content from '../app/components/content';

import GeneralHeader from '../general_header';
import RecentStpacks from '../../containers/recent_stpacks_container';

export default class Recent extends React.PureComponent {

  render () {
    return (
      <Page>
        <GeneralHeader />

        <Content>
          <div className='discover-stpacks'>
            <header className='discover-stpacks__header'>
              <h2 className='discover-stpacks__title'>
                Recently added sticker sets
              </h2>
            </header>

            <RecentStpacks />
          </div>
        </Content>
      </Page>
    );
  }

}
