import { createGetRequest, fetchToAction } from './action_utils';

export function fetchVisibilities() {
  return (dispatch, getState) => {
    const teamId = getState().getIn(['teamStatus', 'teamId']);
    return fetchToAction(
      createGetRequest(getState(), `visibilities?teamId=${teamId}`),
      'TEAM_STATUS_FETCH_VISIBILITIES',
      (json, action) => ({
        ...action,
        visibilities: json.visibilities,
      }))
      .then(dispatch);
  };
}

export function changeTeam(teamId) {
  return dispatch => {
    dispatch({
      type: 'TEAM_STATUS_CHANGE_TEAM',
      teamId,
    });
    return dispatch(fetchVisibilities());
  };
}
