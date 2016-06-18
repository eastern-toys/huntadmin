import { createPostRequest, fetchToAction } from './action_utils';

export function changeTeamId(teamId) {
  return {
    type: 'ADD_TEAM_FORM_CHANGE_TEAM_ID',
    teamId,
  };
}

export function changePassword(password) {
  return {
    type: 'ADD_TEAM_FORM_CHANGE_PASSWORD',
    password,
  };
}

export function submit() {
  return (dispatch, getState) => {
    dispatch({
      type: 'ADD_TEAM_FORM_SUBMIT',
    });
    return fetchToAction(
      createPostRequest(
        getState(),
        'teams',
        {
          teamId: getState().getIn(['addTeamForm', 'teamId']),
          password: getState().getIn(['addTeamForm', 'password']),
        }),
      'ADD_TEAM_FORM_SUBMIT_DONE',
      (json, action) => action)
      .then(dispatch);
  };
}
