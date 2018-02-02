import React from 'react';
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router';

@withRouter
export default class MobileMenu extends React.PureComponent {


  render () {
    return (
      <div className='mobile-menu'>
        <nav className='mobile-menu__nav'>
          <NavLink exact to='/recent' className='mobile-menu__link mobile-menu__link--recent'>
            <i className='fa fa-clock-o' aria-hidden />
          </NavLink>

          <NavLink exact to='/home' className='mobile-menu__link mobile-menu__link--home rich-button'>
            <i className='fa fa-home' aria-hidden />
          </NavLink>

          <NavLink exact to='/search' className='mobile-menu__link mobile-menu__link--search'>
            <i className='fa fa-search' aria-hidden />
          </NavLink>
        </nav>
      </div>
    );
  }

}
