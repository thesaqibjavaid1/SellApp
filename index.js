import {AppRegistry} from 'react-native';
import React from 'react';
import App from './app/index';
import {name as appName} from './app.json';

import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import reducers from './app/store/reducers';
import promiseMiddleware from 'redux-promise';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const createStoreWithMiddleware = createStore(
  reducers,
  composeEnhancers(applyMiddleware(promiseMiddleware)),
);

const appRedux = () => (
  <Provider store={createStoreWithMiddleware}>
    <App />
  </Provider>
);

AppRegistry.registerComponent(appName, () => appRedux);
