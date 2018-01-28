import React from 'react';
import { Switch, Redirect } from 'react-router';
import { WrappedRoute } from './util/react_router_helpers';
import {
  Home,
} from './util/async-components';

export default class App extends React.Component {

  render() {

    return (
      <div className='app' ref={this.setRef}>
        <Switch>
          <Redirect exact from='/' to='/home' />
          <WrappedRoute path='/home' component={Home} />
        </Switch>
      </div>
    );
  }

}
