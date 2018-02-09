import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

export default class MobileMenu extends React.PureComponent {

  static propTypes = {
    location: PropTypes.object.isRequired,
  }

  render () {
    const { location } = this.props;

    return (
      <div className='mobile-menu'>
        <nav className='mobile-menu__nav'>
          <NavLink exact to='/recent'  location={location} className='mobile-menu__link mobile-menu__link--recent' activeClassName='mobile-menu__link mobile-menu__link--current'>
            <i className='fa fa-clock-o' aria-hidden />
          </NavLink>

          <NavLink exact to='/home'  location={location} className='mobile-menu__link mobile-menu__link--home' activeClassName='mobile-menu__link mobile-menu__link--current'>
            <i className='fa fa-paint-brush' aria-hidden />
          </NavLink>

          <NavLink exact to='/search'  location={location} className='mobile-menu__link mobile-menu__link--search' activeClassName='mobile-menu__link mobile-menu__link--current'>
            <i className='fa fa-search' aria-hidden />
          </NavLink>
        </nav>
      </div>
    );
  }

}
