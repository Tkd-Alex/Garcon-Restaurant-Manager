import { createStore, applyMiddleware } from 'redux';

import thunk from 'redux-thunk';
import logger from 'redux-logger';

import appReducer from './reducers';

const store = createStore(appReducer, {}, applyMiddleware(thunk, logger));

export default store;
