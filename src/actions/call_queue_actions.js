import { fetchToAction } from './action_utils';

export function toggleShowComplete() {
  return {
    type: 'CALL_QUEUE_TOGGLE_SHOW_COMPLETE',
  };
}

export function setStatus(submissionId, status) {
  return dispatch => {
    dispatch({
      type: 'SET_SUBMISSION_STATUS',
      submissionId,
      status,
    });
    return fetchToAction(
      new Request(
        `${CUBE_API_SERVER}/submissions/${submissionId}`,
        {
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
          },
          body: JSON.stringify({
            status,
          }),
          method: 'POST',
          mode: 'cors',
        }),
      'SET_SUBMISSION_STATUS_DONE',
      (json, action) => ({
        ...action,
        submissionId,
        status,
      }))
      .then(dispatch);
  };
}
