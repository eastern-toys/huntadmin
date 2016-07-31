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

export function changeEmail(email) {
  return {
    type: 'ADD_TEAM_FORM_CHANGE_EMAIL',
    email,
  };
}

export function changePrimaryPhone(primaryPhone) {
  return {
    type: 'ADD_TEAM_FORM_CHANGE_PRIMARY_PHONE',
    primaryPhone,
  };
}

export function changeSecondaryPhone(secondaryPhone) {
  return {
    type: 'ADD_TEAM_FORM_CHANGE_SECONDARY_PHONE',
    secondaryPhone,
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
          email: getState().getIn(['addTeamForm', 'email']),
          primaryPhone: getState().getIn(['addTeamForm', 'primaryPhone']),
          secondaryPhone: getState().getIn(['addTeamForm', 'secondaryPhone']),
        }),
      'ADD_TEAM_FORM_SUBMIT_DONE',
      (json, action) => action)
      .then(dispatch);
  };
}
