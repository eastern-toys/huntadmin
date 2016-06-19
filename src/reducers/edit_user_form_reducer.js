import _ from 'lodash';

import { Map, Set } from 'immutable';

import { setListDefault } from './reducer_utils';

const INITIAL_STATE = new Map({
  username: '',
  password: '',
  roles: Set.of(),
  submitting: false,
});

export default function (oldState = INITIAL_STATE, action) {
  let state = oldState;
  switch (action.type) {

  case 'FETCH_USERS':
    if (action.users) {
      const initialUsername = state.get('username');

      const usernames = action.users.map(user => user.username);
      state = setListDefault(state, usernames, 'username');

      const currentUsername = state.get('username');

      if (initialUsername !== currentUsername) {
        const user = _.find(
          action.users,
          _.matchesProperty('username', currentUsername));
        if (user.roles !== undefined) {
          state = state.set('roles', new Set(user.roles));
        } else {
          state = state.set('roles', Set.of());
        }
      }
    }
    return state;

  case 'EDIT_USER_FORM_CHANGE_USERNAME':
    return state.set('username', action.username);

  case 'EDIT_USER_FORM_CHANGE_PASSWORD':
    return state.set('password', action.password);

  case 'EDIT_USER_FORM_SET_ROLES':
    return state.set('roles', new Set(action.roles));

  case 'EDIT_USER_FORM_ADD_ROLE':
    return state.update('roles', roles => roles.add(action.role));

  case 'EDIT_USER_FORM_REMOVE_ROLE':
    return state.update('roles', roles => roles.delete(action.role));

  case 'EDIT_USER_FORM_SUBMIT':
    return state.set('submitting', true);

  case 'EDIT_USER_FORM_SUBMIT_DONE':
    return state
      .set('submitting', false)
      .set('password', '');

  default:
    return state;
  }
}
