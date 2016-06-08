import { List, Map, fromJS } from 'immutable';

const INITIAL_STATE = new Map({
  username: '',
  password: '',
  user: null,
  permissions: new List(),
  loggingIn: false,
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
      .set('user', action.user ? fromJS(action.user) : null)
      .set('permissions',
           action.permissions ? fromJS(action.permissions) : new List());

  case 'AUTH_LOGOUT':
    return state
      .set('user', null)
      .set('permissions', new List())
      .set('password', '');

  default:
    return state;
  }
}
