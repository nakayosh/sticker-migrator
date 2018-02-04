import React from 'react';
import { Link } from 'react-router-dom';

import Logo from '../../../images/logo_large.png';
import MessageContainer from '../../containers/message_container';

export default class GeneralHeader extends React.PureComponent {

  render () {
    return (
      <header className='general-header' role='banner'>
        <Link to='/'>
          <h1>
            <span className='invisible'>
              Sticker Migrator
            </span>

            <img src={Logo} alt='Sticker Migrator' />
          </h1>
        </Link>

        <MessageContainer />
      </header>
    );
  }

}
