import React from 'react';
import { Link } from 'react-router-dom';

import Logo from '../../../images/logo_large.png';

export default class GeneralHeader extends React.PureComponent {

  render () {
    return (
      <header className='general-header' role='banner'>
        <Link to='/'>
          <h1>
            <span className='invisible'>
              Sticker Migrater
            </span>

            <img src={Logo} alt='Sticker Migrater' />
          </h1>
        </Link>
      </header>
    );
  }

}
