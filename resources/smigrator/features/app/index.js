import React from 'react';
import { Switch, Redirect } from 'react-router';
import { WrappedRoute } from './util/react_router_helpers';
import { ImmutableLoadingBar as LoadingBar } from 'react-redux-loading-bar';
import ModalContaienr from './containers/modal_container';
import { isMobile } from '../../is_mobile';

import {
  Home,
  Stpacks,
  Compose,
  Recent,
  Search,
} from './util/async-components';

import MobileMenu from '../mobile_menu';

export default class App extends React.Component {

  render() {

    return (
      <div className='app' ref={this.setRef}>
        <Switch>
          <Redirect exact from='/' to='/home' />

          <WrappedRoute path='/home' component={Home} />
          <WrappedRoute path='/recent' component={Recent} />
          <WrappedRoute path='/search' component={Search} />
          <WrappedRoute path='/stpacks/:id' component={Stpacks} />
          <WrappedRoute path='/stpacks/:id/compose' component={Compose} />
        </Switch>

        <ModalContaienr />
        { isMobile(window.innerWidth) && <MobileMenu /> }

        <LoadingBar className='loading-bar' />
      </div>
    );
  }

}
