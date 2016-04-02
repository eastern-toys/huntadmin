import { fetchToAction } from './action_utils';

export function startHunt() {
  return dispatch => {
    dispatch({
      type: 'START_HUNT',
    });
    return fetchToAction(
      new Request(
        `${CUBE_API_SERVER}/events`,
        {
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
          },
          body: JSON.stringify({
            eventType: 'HuntStart',
            runId: 'development',
          }),
          method: 'POST',
          mode: 'cors',
        }),
      'START_HUNT_DONE',
      (json, action) => action)
      .then(dispatch);
  };
}
