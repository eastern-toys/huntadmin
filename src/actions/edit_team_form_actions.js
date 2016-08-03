import { createPostRequest, fetchToAction } from './action_utils';

import { fetchTeams } from './common_actions';

export function refresh() {
  return fetchTeams();
}

export function changeEmail(email) {
  return {
    type: 'EDIT_TEAM_FORM_CHANGE_EMAIL',
    email,
  };
}

export function changePrimaryPhone(primaryPhone) {
  return {
    type: 'EDIT_TEAM_FORM_CHANGE_PRIMARY_PHONE',
    primaryPhone,
  };
}

export function changeSecondaryPhone(secondaryPhone) {
  return {
    type: 'EDIT_TEAM_FORM_CHANGE_SECONDARY_PHONE',
    secondaryPhone,
  };
}

export function changeTeamId(teamId) {
  return (dispatch, getState) => {
    dispatch({
      type: 'EDIT_TEAM_FORM_CHANGE_TEAM_ID',
      teamId,
    });

    const team = getState().getIn(['common', 'teams', teamId]);
    dispatch(changeEmail(team.get('email')));
    dispatch(changePrimaryPhone(team.get('primaryPhone')));
    dispatch(changeSecondaryPhone(team.get('secondaryPhone')));
  };
}

export function submit() {
  return (dispatch, getState) => {
    dispatch({
      type: 'EDIT_TEAM_FORM_SUBMIT',
    });

    const teamId = getState().getIn(['editTeamForm', 'teamId']);
    const team = {
      teamId,
      email: getState().getIn(['editTeamForm', 'email']),
      primaryPhone: getState().getIn(['editTeamForm', 'primaryPhone']),
      secondaryPhone: getState().getIn(['editTeamForm', 'secondaryPhone']),
    };

    return fetchToAction(
      createPostRequest(
        getState(),
        `teams/${teamId}`,
        team),
      'EDIT_TEAM_FORM_SUBMIT_DONE',
      (json, action) => action)
      .then(action => {
        dispatch(action);
        dispatch(refresh());
      });
  };
}
