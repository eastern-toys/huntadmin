import { Map } from 'immutable';

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';

import { App } from './components/App';
import { CallQueueContainer } from './components/CallQueue';
import { Home } from './components/Home';
import { SubmitAnswerFormContainer } from './components/SubmitAnswerForm';
import { TeamStatusContainer } from './components/TeamStatus';

import reducer from './reducers/reducer';

import * as callQueueActions from './actions/call_queue_actions';
import * as submitAnswerFormActions from './actions/submit_answer_form_actions';
import * as teamStatusActions from './actions/team_status_actions';

const loggerMiddleware = createLogger({
  stateTransformer: state => state.toJS(),
});
const store = createStore(reducer, new Map(), applyMiddleware(
  thunkMiddleware,
  loggerMiddleware));

store.dispatch(callQueueActions.refreshSubmissions());
store.dispatch(submitAnswerFormActions.refreshTeams());
store.dispatch(teamStatusActions.refreshTeams());

const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="callqueue" component={CallQueueContainer} />
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
