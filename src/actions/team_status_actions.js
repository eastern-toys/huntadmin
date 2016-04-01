import { fetchToAction } from './action_utils';

export function fetchVisibilities() {
  return (dispatch, getState) => {
    const teamId = getState().getIn(['teamStatus', 'teamId']);
    return fetchToAction(
      new Request(
        `${CUBE_API_SERVER}/visibilities?teamId=${teamId}`, { mode: 'cors' }),
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
