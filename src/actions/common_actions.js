import _ from 'lodash';
import { fetchToAction } from './action_utils';

export function fetchSubmissions() {
  return dispatch => fetchToAction(
    new Request(
      `${CUBE_API_SERVER}/submissions`, { mode: 'cors' }),
    'FETCH_SUBMISSIONS',
    (json, action) => ({
      ...action,
      submissions: json.submissions,
    }))
    .then(dispatch);
}

export function fetchTeams() {
  return dispatch => fetchToAction(
    new Request(
      `${CUBE_API_SERVER}/teams`, { mode: 'cors' }),
    'FETCH_TEAMS',
    (json, action) => ({
      ...action,
      teamIds: _.map(json.teams, _.property('teamId')),
    }))
    .then(dispatch);
}

export function fetchVisibilityHistory() {
  return dispatch => fetchToAction(
    new Request(
      `${CUBE_API_SERVER}/visibilityhistory`, { mode: 'cors' }),
    'FETCH_VISIBILITY_HISTORY',
    (json, action) => ({
      ...action,
      visibilityChanges: json.visibilityChanges,
    }))
    .then(dispatch);
}

export function refresh() {
  return dispatch => Promise.all([
    dispatch(fetchSubmissions()),
    dispatch(fetchVisibilityHistory()),
  ]).then(() => dispatch({
    type: 'REFRESH_COMPLETE',
    timestamp: Date.now(),
  }));
}

export function toggleAutoRefresh() {
  return (dispatch, getState) => {
    if (!getState().getIn(['common', 'autoRefresh'])) {
      const timer = setInterval(() => dispatch(refresh()), 10000);
      return dispatch({
        type: 'TOGGLE_AUTO_REFRESH',
        timer,
      });
    }
    clearInterval(getState().getIn(['common', 'autoRefreshTimer']));
    return dispatch({
      type: 'TOGGLE_AUTO_REFRESH',
    });
  };
}
