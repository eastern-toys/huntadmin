import { createPostRequest, fetchToAction } from './action_utils';

export function startHunt() {
  return dispatch => {
    dispatch({
      type: 'START_HUNT',
    });
    return fetchToAction(
      createPostRequest('events', {
        eventType: 'HuntStart',
        runId: 'development',
      }),
      'START_HUNT_DONE',
      (json, action) => action)
      .then(dispatch);
  };
}
