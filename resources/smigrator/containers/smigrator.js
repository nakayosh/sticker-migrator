import React from 'react';
import { Provider } from 'react-redux';
import { Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { ScrollContext } from 'react-router-scroll-4';
import configureStore from '@/store/configureStore';
import { hydrateStore } from '@/actions/store';
import App from '@/features/app';
import initialState from '@/initial_state';

export const store = configureStore();
const hydrateAction = hydrateStore(initialState);
store.dispatch(hydrateAction);

export default class Smigrator extends React.PureComponent {

  render() {
    return (
      <Provider store={store} >
        <BrowserRouter>
          <ScrollContext>
            <Route path='/' component={App} />
          </ScrollContext>
        </BrowserRouter>
      </Provider>
    );
  }

}
