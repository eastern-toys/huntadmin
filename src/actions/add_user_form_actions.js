import { createPostRequest, fetchToAction } from './action_utils';

export function changeUsername(username) {
  return {
    type: 'ADD_USER_FORM_CHANGE_USERNAME',
    username,
  };
}

export function changePassword(password) {
  return {
    type: 'ADD_USER_FORM_CHANGE_PASSWORD',
    password,
  };
}

export function changeRole(role, granted) {
  return {
    type: 'ADD_USER_FORM_CHANGE_ROLE',
    role,
    granted,
  };
}

export function submit() {
  return (dispatch, getState) => {
    dispatch({
      type: 'ADD_USER_FORM_SUBMIT',
    });
    return fetchToAction(
      createPostRequest(
        getState(),
        'users',
        {
          username: getState().getIn(['addUserForm', 'username']),
          password: getState().getIn(['addUserForm', 'password']),
          roles: getState().getIn(['addUserForm', 'roles']).toJS(),
        }),
      'ADD_USER_FORM_SUBMIT_DONE',
      (json, action) => action)
      .then(dispatch);
  };
}
