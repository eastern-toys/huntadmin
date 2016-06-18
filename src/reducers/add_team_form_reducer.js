import { Map } from 'immutable';

const INITIAL_STATE = new Map({
  teamId: '',
  password: '',
  submitting: false,
});

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {

  case 'ADD_TEAM_FORM_CHANGE_TEAM_ID':
    return state.set('teamId', action.teamId);

  case 'ADD_TEAM_FORM_CHANGE_PASSWORD':
    return state.set('password', action.password);

  case 'ADD_TEAM_FORM_SUBMIT':
    return state.set('submitting', true);

  case 'ADD_TEAM_FORM_SUBMIT_DONE':
    return state
      .set('submitting', false)
      .set('teamId', '')
      .set('password', '');

  default:
    return state;
  }
}
