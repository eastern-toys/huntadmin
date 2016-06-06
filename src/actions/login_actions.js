import { createGetRequest, fetchToAction } from './action_utils';

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
      'AUTH_LOGIN_DONE',
      (json, action) => ({
        ...action,
        user: json,
      }))
      .then(action => {
        dispatch(action);
        if (getState().getIn(['auth', 'user'])) {
          router.push('/');
          Promise.all([
            dispatch(commonActions.fetchTeams()),
            dispatch(commonActions.refresh()),
          ]).then(() => Promise.all([
            dispatch(submitAnswerFormActions.fetchPuzzles()),
            dispatch(teamStatusActions.fetchVisibilities()),
          ]));
        }
      });
  };
}
