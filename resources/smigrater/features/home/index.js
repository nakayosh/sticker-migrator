import React from 'react';

import Page from '../app/components/page';
import Content from '../app/components/content';

import Logo from '../../../images/logo_large.png';

export default class Home extends React.PureComponent {

  render () {
    return (
      <Page>
        <Content>
          <h1>
            <span className='invisible'>
              Sticker Migrater
            </span>

            <img src={Logo} alt='Sticker Migrater' />
          </h1>
        </Content>
      </Page>
    );
  }

}
