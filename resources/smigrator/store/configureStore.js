import { createStore, applyMiddleware, compose } from 'redux';
import reducers from '@/reducers';
import thunk from 'redux-thunk';
import loadingBarMiddleware from '@/middleware/loading_bar';
import errorsMiddleware from '@/middleware/error';

export default function configureStore() {
  return createStore(reducers, compose(applyMiddleware(
    thunk,
    loadingBarMiddleware({ promiseTypeSuffixes: ['REQUEST', 'SUCCESS', 'FAIL'] }),
    errorsMiddleware()
  )));
};
