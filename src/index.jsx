import { Map } from 'immutable';

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';

import { AppContainer } from './components/App';
import { CallQueueContainer } from './components/CallQueue';
import { Home } from './components/Home';
import { HuntStatusContainer } from './components/HuntStatus';
import { SubmitAnswerFormContainer } from './components/SubmitAnswerForm';
import { TeamStatusContainer } from './components/TeamStatus';

import reducer from './reducers/reducer';

import * as commonActions from './actions/common_actions';
import * as submitAnswerFormActions from './actions/submit_answer_form_actions';
import * as teamStatusActions from './actions/team_status_actions';

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

store.dispatch(dispatch =>
  Promise.all([
    dispatch(commonActions.fetchTeams()),
    dispatch(commonActions.refresh()),
  ]).then(() => Promise.all([
    dispatch(submitAnswerFormActions.fetchPuzzles()),
    dispatch(teamStatusActions.fetchVisibilities()),
  ])));

const routes = (
  <Route path="/" component={AppContainer}>
    <IndexRoute component={Home} />
    <Route path="callqueue" component={CallQueueContainer} />
    <Route path="huntstatus" component={HuntStatusContainer} />
    <Route path="teamstatus" component={TeamStatusContainer} />
    <Route path="submitanswer" component={SubmitAnswerFormContainer} />
  </Route>
);

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>{routes}</Router>
  </Provider>,
  document.getElementById('app')
);
