import { createStore, applyMiddleware } from 'redux';

import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import logger from 'redux-logger';

import appReducer from './reducers';

const store = createStore(appReducer, {}, applyMiddleware(thunk));

export default store;
