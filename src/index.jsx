import { Map } from 'immutable';

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';

import { AdminTools } from './components/AdminTools';
import { AppContainer } from './components/App';
import { CallQueueContainer } from './components/CallQueue';
import { Home } from './components/Home';
import { LoginFormContainer } from './components/LoginForm';
import { TeamStatusContainer } from './components/TeamStatus';
import { UsersContainer } from './components/Users';

import { fetchToAction } from './actions/action_utils';

import reducer from './reducers/reducer';

import { userMayAccess } from './util/user.js';

let middleware;
if (DEBUG) {
  const loggerMiddleware = createLogger({
    stateTransformer: state => state.toJS(),
  });
  middleware = applyMiddleware(thunkMiddleware, loggerMiddleware);
} else {
  middleware = applyMiddleware(thunkMiddleware);
}

const store = createStore(reducer, new Map(), middleware);

fetchToAction(
  'config.json',
  'SET_CUBE_API_SERVER',
  (json, action) => ({
    ...action,
    cubeApiServer: json.cubeApiServer,
  }))
  .then(store.dispatch);

function requireAuth(nextState, replace) {
  const user = store.getState().getIn(['auth', 'user']);
  const permissions = store.getState().getIn(['auth', 'permissions']);
  if (user) {
    if (!userMayAccess(permissions, nextState.location.pathname)) {
      replace({
        pathname: '/',
      });
    }
  } else {
    replace({
      pathname: '/login',
    });
  }
}

const routes = (
  <Route path="/" component={AppContainer}>
    <IndexRoute component={Home} onEnter={requireAuth} />
    <Route path="admintools" component={AdminTools} onEnter={requireAuth} />
    <Route path="callqueue" component={CallQueueContainer} onEnter={requireAuth} />
    <Route path="login" component={LoginFormContainer} />
    <Route path="teamstatus" component={TeamStatusContainer} onEnter={requireAuth} />
    <Route path="users" component={UsersContainer} onEnter={requireAuth} />
  </Route>
);

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>{routes}</Router>
  </Provider>,
  document.getElementById('app')
);
