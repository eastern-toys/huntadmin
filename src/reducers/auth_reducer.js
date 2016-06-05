import { Map } from 'immutable';

const INITIAL_STATE = new Map({
  username: '',
  password: '',
  loggingIn: false,
  loggedIn: false,
});

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {

  case 'AUTH_CHANGE_USERNAME':
    return state.set('username', action.username);

  case 'AUTH_CHANGE_PASSWORD':
    return state.set('password', action.password);

  case 'AUTH_LOGIN':
    return state.set('loggingIn', true);

  case 'AUTH_LOGIN_DONE':
    return state
      .set('loggingIn', false)
      .set('loggedIn', action.error === undefined);

  case 'AUTH_LOGOUT':
    return state
      .set('loggedIn', false)
      .set('password', '');

  default:
    return state;
  }
}
