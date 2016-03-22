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
