import { Set } from 'immutable';

import { createGetRequest, fetchToAction, responseErrorPromise } from './action_utils';

export function fetchPuzzles() {
  return (dispatch, getState) => {
    const pendingSubmissionPuzzleIds = new Set(
      getState()
        .getIn(['callQueue', 'pendingSubmissions'])
        .map(s => s.get('puzzleId')));
    const downloadedPuzzleIds = new Set(
      getState().getIn(['callQueue', 'puzzles']).keys());
    const puzzleIdsToFetch =
      pendingSubmissionPuzzleIds.subtract(downloadedPuzzleIds);

    if (puzzleIdsToFetch.isEmpty()) {
      return;
    }

    const puzzlePromises = puzzleIdsToFetch.map(puzzleId => {
      const request = createGetRequest(getState(), `puzzle/${puzzleId}`);
      return fetch(request)
        .then(response => {
          if (!response.ok) {
            return responseErrorPromise(request, response)
              .then(error => Promise.reject(error));
          }
          return response.json();
        });
    });
    Promise.all(puzzlePromises).then(puzzles => {
      dispatch({
        type: 'FETCH_PUZZLES',
        puzzles,
      });
    });
  };
}

export function fetchSubmissions() {
  return (dispatch, getState) => fetchToAction(
    createGetRequest(getState(), 'submissions?status=SUBMITTED,ASSIGNED'),
    'FETCH_PENDING_SUBMISSIONS',
    (json, action) => ({
      ...action,
      submissions: json.submissions,
    }))
    .then(action => {
      dispatch(action);
      return dispatch(fetchPuzzles());
    });
}

export function fetchTeams() {
  return (dispatch, getState) => fetchToAction(
    createGetRequest(getState(), 'teams'),
    'FETCH_TEAMS',
    (json, action) => ({
      ...action,
      teams: json.teams,
    }))
    .then(dispatch);
}

export function fetchUsers() {
  return (dispatch, getState) => fetchToAction(
    createGetRequest(getState(), 'users'),
    'FETCH_USERS',
    (json, action) => ({
      ...action,
      users: json.users,
    }))
    .then(dispatch);
}

export function fetchHuntStarted() {
  // TODO: introduce a less expensive way to determine this
  return (dispatch, getState) => fetchToAction(
    createGetRequest(getState(), 'visibilities'),
    'FETCH_HUNT_STARTED',
    (json, action) => ({
      ...action,
      huntStarted: json.visibilities.length > 0,
    }))
    .then(dispatch);
}

export function refresh() {
  return dispatch => Promise.all([
    dispatch(fetchTeams()),
    dispatch(fetchSubmissions()),
    dispatch(fetchUsers()),
    dispatch(fetchHuntStarted()),
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
