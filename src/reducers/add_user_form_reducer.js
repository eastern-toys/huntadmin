import { Map, Set } from 'immutable';

const INITIAL_STATE = new Map({
  username: '',
  password: '',
  roles: Set.of('writingteam'),
  submitting: false,
});

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {

  case 'ADD_USER_FORM_CHANGE_USERNAME':
    return state.set('username', action.username);

  case 'ADD_USER_FORM_CHANGE_PASSWORD':
    return state.set('password', action.password);

  case 'ADD_USER_FORM_ADD_ROLE':
    return state.update('roles', roles => roles.add(action.role));

  case 'ADD_USER_FORM_REMOVE_ROLE':
    return state.update('roles', roles => roles.delete(action.role));

  case 'ADD_USER_FORM_SUBMIT':
    return state.set('submitting', true);

  case 'ADD_USER_FORM_SUBMIT_DONE':
    return state
      .set('submitting', false)
      .set('username', '')
      .set('password', '');

  default:
    return state;
  }
}
