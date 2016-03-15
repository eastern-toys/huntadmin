import { fetchToAction } from './action_utils';

export function refreshSubmissions() {
  return dispatch => fetchToAction(
    new Request(`${CUBE_API_SERVER}/submissions`, { mode: 'cors' }),
    'CALL_QUEUE_FETCH_SUBMISSIONS',
    (json, action) => ({
      ...action,
      submissions: json.submissions,
      timestamp: Date.now(),
    }))
    .then(dispatch);
}

export function toggleAutoRefresh() {
  return (dispatch, getState) => {
    if (!getState().getIn(['callQueue', 'autoRefresh'])) {
      const timer = setInterval(() => dispatch(refreshSubmissions()), 10000);
      return dispatch({
        type: 'CALL_QUEUE_TOGGLE_AUTO_REFRESH',
        timer,
      });
    }
    clearInterval(getState().getIn(['callQueue', 'autoRefreshTimer']));
    return dispatch({
      type: 'CALL_QUEUE_TOGGLE_AUTO_REFRESH',
    });
  };
}

export function toggleShowComplete() {
  return {
    type: 'CALL_QUEUE_TOGGLE_SHOW_COMPLETE',
  };
}

export function setStatus(submissionId, status) {
  return dispatch => {
    dispatch({
      type: 'CALL_QUEUE_SET_STATUS',
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
      'CALL_QUEUE_SET_STATUS_DONE',
      (json, action) => ({
        ...action,
        submissionId,
        status,
      }))
      .then(dispatch);
  };
}
