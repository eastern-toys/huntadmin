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
    // TODO: do a fetchToAction to validate password
    setTimeout(() => {
      const state = getState();
      if (state.getIn(['auth', 'username']) === 'setec' &&
          state.getIn(['auth', 'password']) === 'setec') {
        dispatch({
          type: 'AUTH_LOGIN_DONE',
        });
        router.push('/');

        Promise.all([
          dispatch(commonActions.fetchTeams()),
          dispatch(commonActions.refresh()),
        ]).then(() => Promise.all([
          dispatch(submitAnswerFormActions.fetchPuzzles()),
          dispatch(teamStatusActions.fetchVisibilities()),
        ]));
      } else {
        dispatch({
          type: 'AUTH_LOGIN_DONE',
          error: 'wrong username or password',
        });
      }
    }, 1000);
  };
}
