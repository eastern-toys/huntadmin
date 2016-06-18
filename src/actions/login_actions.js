import _ from 'lodash';

import { createGetRequest, responseErrorPromise } from './action_utils';
import { PERMISSIONS } from '../util/user';

import * as commonActions from './common_actions';
import * as submitAnswerFormActions from './submit_answer_form_actions';
import * as teamStatusActions from './team_status_actions';

export function changeUsername(username) {
  return {
    type: 'AUTH_CHANGE_USERNAME',
    username,
  };
}

export function changePassword(password) {
  return {
    type: 'AUTH_CHANGE_PASSWORD',
    password,
  };
}

export function login(router) {
  return (dispatch, getState) => {
    dispatch({
      type: 'AUTH_LOGIN',
    });

    const username = getState().getIn(['auth', 'username']);
    let user;
    let authorizedPermissions;

    return fetch(createGetRequest(getState(), `users/${username}`))
      .then(response => {
        if (!response.ok) {
          return responseErrorPromise(response)
            .then(error => Promise.reject(error));
        }
        return response.json();
      })

      .then(userJson => {
        user = userJson;

        const permissionPromises = _.map(
          PERMISSIONS,
          permission => fetch(
            createGetRequest(getState(), `authorized?permission=${permission}`))
            .then(response => {
              if (!response.ok) {
                return responseErrorPromise(response).then(error => ({
                  error,
                }));
              }
              return response.json();
            }));
        return Promise.all(permissionPromises);
      })

      .then(permissionPromiseResults => {
        const failedPermissionPromiseResult = _.find(
          permissionPromiseResults,
          _.property('error'));
        if (failedPermissionPromiseResult) {
          return Promise.reject(failedPermissionPromiseResult.error);
        }

        const permissionResponses = _.zipWith(
          PERMISSIONS, permissionPromiseResults, (permission, response) => ({
            permission,
            ...response,
          }));
        authorizedPermissions = _.chain(permissionResponses)
          .filter(response => response.authorized)
          .map(_.property('permission'))
          .value();

        return Promise.all([
          dispatch(commonActions.fetchTeams()),
          dispatch(commonActions.refresh()),
        ]);
      })

      .then(() => Promise.all([
        dispatch(submitAnswerFormActions.fetchPuzzles()),
        dispatch(teamStatusActions.fetchVisibilities()),
      ]))

      .then(() => {
        dispatch({
          type: 'AUTH_LOGIN_DONE',
          user,
          permissions: authorizedPermissions,
        });
        router.push('/');
      })

      .catch(error => {
        let actionError = error;
        if (error instanceof Error) {
          actionError = {
            statusCode: 0,
            statusText: 'Unknown error type',
            description: String(error),
          };
        }
        dispatch({
          type: 'AUTH_LOGIN_DONE',
          error: actionError,
        });
      });
  };
}

export function logout(router) {
  return (dispatch, getState) => {
    dispatch({
      type: 'AUTH_LOGOUT',
    });
    if (getState().getIn(['common', 'autoRefresh'])) {
      dispatch(commonActions.toggleAutoRefresh());
    }
    router.push('/login');
  };
}
