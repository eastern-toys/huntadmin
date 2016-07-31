import _ from 'lodash';

import { Map } from 'immutable';

import { setListDefault } from './reducer_utils';

const INITIAL_STATE = new Map({
  teamId: '',
  email: '',
  primaryPhone: '',
  secondaryPhone: '',
  submitting: false,
});

function setStateString(state, src, stateKey) {
  if (src !== undefined && src !== null) {
    return state.set(stateKey, src);
  }
  return state.set(stateKey, '');
}

export default function (oldState = INITIAL_STATE, action) {
  let state = oldState;
  switch (action.type) {

  case 'FETCH_TEAMS':
    if (action.teams) {
      const initialTeamId = state.get('teamId');

      const teamIds = action.teams.map(team => team.teamId);
      state = setListDefault(state, teamIds, 'teamId');

      const currentTeamId = state.get('teamId');

      if (initialTeamId !== currentTeamId) {
        const team = _.find(
          action.teams,
          _.matchesProperty('teamId', currentTeamId));
        state = setStateString(state, team.email, 'email');
        state = setStateString(state, team.primaryPhone, 'primaryPhone');
        state = setStateString(state, team.secondaryPhone, 'secondaryPhone');
      }
    }
    return state;

  case 'EDIT_TEAM_FORM_CHANGE_TEAM_ID':
    return state.set('teamId', action.teamId);

  case 'EDIT_TEAM_FORM_CHANGE_EMAIL':
    return state.set('email', action.email);

  case 'EDIT_TEAM_FORM_CHANGE_PRIMARY_PHONE':
    return state.set('primaryPhone', action.primaryPhone);

  case 'EDIT_TEAM_FORM_CHANGE_SECONDARY_PHONE':
    return state.set('secondaryPhone', action.secondaryPhone);

  case 'EDIT_TEAM_FORM_SUBMIT':
    return state.set('submitting', true);

  case 'EDIT_TEAM_FORM_SUBMIT_DONE':
    return state.set('submitting', false);

  default:
    return state;
  }
}
