import _ from 'lodash';

import { createGetRequest, fetchToAction, responseErrorPromise } from './action_utils';
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

export function submit(router) {
  return (dispatch, getState) => {
    dispatch({
      type: 'AUTH_LOGIN',
    });

    const username = getState().getIn(['auth', 'username']);

    return fetchToAction(
      createGetRequest(getState(), `users/${username}`),
      'AUTH_LOGIN_USER_FETCHED',
      (json, action) => ({
        ...action,
        user: json,
      }))

      .then(userFetchedAction => {
        dispatch(userFetchedAction);
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
          return dispatch({
            type: 'AUTH_LOGIN_DONE',
            error: failedPermissionPromiseResult.error,
          });
        }

        const permissionResponses = _.zipWith(
          PERMISSIONS, permissionPromiseResults, (permission, response) => ({
            permission,
            ...response,
          }));
        const authorizedPermissions = _.chain(permissionResponses)
          .filter(response => response.authorized)
          .map(_.property('permission'))
          .value();
        dispatch({
          type: 'AUTH_LOGIN_PERMISSIONS_FETCHED',
          permissions: authorizedPermissions,
        });

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
        router.push('/');
        dispatch({
          type: 'AUTH_LOGIN_DONE',
        });
      });
  };
}
