import { fetchToAction } from './action_utils';

export function refreshVisibilityHistory() {
  return dispatch => fetchToAction(
      new Request(
        `${CUBE_API_SERVER}/visibilityhistory`, { mode: 'cors' }),
      'HUNT_STATUS_FETCH_VISIBILITY_HISTORY',
      (json, action) => ({
        ...action,
        visibilityChanges: json.visibilityChanges,
      }))
      .then(dispatch);
}

export function refreshSubmissions() {
  return dispatch => fetchToAction(
    new Request(
      `${CUBE_API_SERVER}/submissions`, { mode: 'cors' }),
    'HUNT_STATUS_FETCH_SUBMISSIONS',
    (json, action) => ({
      ...action,
      submissions: json.submissions,
    }))
    .then(dispatch);
}

export function refresh() {
  return dispatch => Promise.all([
    dispatch(refreshVisibilityHistory()),
    dispatch(refreshSubmissions()),
  ]);
}
