import { Map } from 'immutable';

const INITIAL_STATE = new Map({
  teamId: '',
  password: '',
  email: '',
  primaryPhone: '',
  secondaryPhone: '',
  submitting: false,
});

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {

  case 'ADD_TEAM_FORM_CHANGE_TEAM_ID':
    return state.set('teamId', action.teamId);

  case 'ADD_TEAM_FORM_CHANGE_PASSWORD':
    return state.set('password', action.password);

  case 'ADD_TEAM_FORM_CHANGE_EMAIL':
    return state.set('email', action.email);

  case 'ADD_TEAM_FORM_CHANGE_PRIMARY_PHONE':
    return state.set('primaryPhone', action.primaryPhone);

  case 'ADD_TEAM_FORM_CHANGE_SECONDARY_PHONE':
    return state.set('secondaryPhone', action.secondaryPhone);

  case 'ADD_TEAM_FORM_SUBMIT':
    return state.set('submitting', true);

  case 'ADD_TEAM_FORM_SUBMIT_DONE':
    return state
      .set('submitting', false)
      .set('teamId', '')
      .set('password', '')
      .set('email', '')
      .set('primaryPhone', '')
      .set('secondaryPhone', '');

  default:
    return state;
  }
}
