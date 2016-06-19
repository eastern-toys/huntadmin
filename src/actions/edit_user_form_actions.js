import { createPostRequest, fetchToAction } from './action_utils';

import * as commonActions from './common_actions';

export function refresh() {
  return commonActions.fetchUsers();
}

function setRoles(roles) {
  return {
    type: 'EDIT_USER_FORM_SET_ROLES',
    roles,
  };
}

export function changeUsername(username) {
  return (dispatch, getState) => {
    dispatch({
      type: 'EDIT_USER_FORM_CHANGE_USERNAME',
      username,
    });

    dispatch({
      type: 'EDIT_USER_FORM_CHANGE_PASSWORD',
      password: '',
    });

    const user = getState().getIn(['common', 'users']).find(
      u => u.get('username') === username);
    return dispatch(setRoles(user.get('roles')));
  };
}

export function changePassword(password) {
  return {
    type: 'EDIT_USER_FORM_CHANGE_PASSWORD',
    password,
  };
}

export function addRole(role) {
  return {
    type: 'EDIT_USER_FORM_ADD_ROLE',
    role,
  };
}

export function removeRole(role) {
  return {
    type: 'EDIT_USER_FORM_REMOVE_ROLE',
    role,
  };
}

export function submit() {
  return (dispatch, getState) => {
    dispatch({
      type: 'EDIT_USER_FORM_SUBMIT',
    });

    const username = getState().getIn(['editUserForm', 'username']);
    const roles = getState().getIn(['editUserForm', 'roles']).toJS();
    const user = {
      username,
      roles,
    };
    const password = getState().getIn(['editUserForm', 'password']);
    if (password.length > 0) {
      user.password = password;
    }

    return fetchToAction(
      createPostRequest(
        getState(),
        `users/${username}`,
        user),
      'EDIT_USER_FORM_SUBMIT_DONE',
      (json, action) => action)
      .then(action => {
        dispatch(action);
        dispatch(refresh());
      });
  };
}
