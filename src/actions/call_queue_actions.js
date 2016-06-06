import { createPostRequest, fetchToAction } from './action_utils';

export function toggleShowComplete() {
  return {
    type: 'CALL_QUEUE_TOGGLE_SHOW_COMPLETE',
  };
}

export function setStatus(submissionId, status) {
  return (dispatch, getState) => {
    dispatch({
      type: 'SET_SUBMISSION_STATUS',
      submissionId,
      status,
    });
    return fetchToAction(
      createPostRequest(
        getState(),
        `submissions/${submissionId}`,
        {
          status,
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
