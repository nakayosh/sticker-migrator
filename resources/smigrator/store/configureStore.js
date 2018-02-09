import { createStore, applyMiddleware } from 'redux';
import reducers from '@/reducers';
import thunk from 'redux-thunk';
import loadingBarMiddleware from '@/middleware/loading_bar';
import errorsMiddleware from '@/middleware/error';

export default function configureStore() {
  return createStore(reducers, applyMiddleware(
    thunk,
    loadingBarMiddleware({ promiseTypeSuffixes: ['REQUEST', 'SUCCESS', 'FAIL'] }),
    errorsMiddleware()
  ));
};
