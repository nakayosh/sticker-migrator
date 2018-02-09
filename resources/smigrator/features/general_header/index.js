import React from 'react';
import { Link } from 'react-router-dom';
import MessageContainer from '@/containers/message_container';
import logo_large_black from '@/../images/logo_large_black.png';

export default class GeneralHeader extends React.PureComponent {

  render () {
    return (
      <header className='general-header' role='banner'>
        <Link to='/' className='general-header__inner'>
          <img src={logo_large_black} />

          <h1 className='invisible'>
            Sticker Migrator
          </h1>
        </Link>

        <MessageContainer />
      </header>
    );
  }

}
