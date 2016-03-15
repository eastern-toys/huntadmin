import _ from 'lodash';
import { fetchToAction } from './action_utils';

export function refreshVisibilities() {
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

export function refreshTeams() {
  return dispatch => fetchToAction(
    new Request(`${CUBE_API_SERVER}/teams`, { mode: 'cors' }),
    'TEAM_STATUS_FETCH_TEAMS',
    (json, action) => ({
      ...action,
      teamIds: _.map(json.teams, _.property('teamId')),
    }))
    .then(action => {
      dispatch(action);
      return dispatch(refreshVisibilities());
    });
}

export function changeTeam(teamId) {
  return dispatch => {
    dispatch({
      type: 'TEAM_STATUS_CHANGE_TEAM',
      teamId,
    });
    return dispatch(refreshVisibilities());
  };
}
