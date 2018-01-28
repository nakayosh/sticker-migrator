import { createStore, applyMiddleware, compose } from 'redux';
import reducers from '../reducers';
import thunk from 'redux-thunk';

function configureStore() {
  return createStore(
    reducers,
    compose(applyMiddleware(
      thunk,
    ))
  );
}

export default configureStore;
