import { createPostRequest, fetchToAction } from './action_utils';
import { refresh } from './common_actions';
import {
  isAssignedStatus,
  isAssignedHintRequestStatus,
  isCompleteStatus,
  isCompleteHintRequestStatus,
} from '../util/status';

export function setStatus(submissionId, status) {
  return (dispatch, getState) => {
    let callerUsername = undefined;
    if (isAssignedStatus(status)) {
      callerUsername = getState().getIn(['auth', 'username']);
    }
    dispatch({
      type: 'SET_SUBMISSION_STATUS',
      submissionId,
      status,
      callerUsername,
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
        callerUsername,
      }))
      .then(action => {
        dispatch(action);
        if (action.error || isCompleteStatus(status)) {
          dispatch(refresh());
        }
      });
  };
}

export function setHintRequestStatus(hintRequestId, status) {
  return (dispatch, getState) => {
    let callerUsername = undefined;
    if (isAssignedHintRequestStatus(status)) {
      callerUsername = getState().getIn(['auth', 'username']);
    }
    dispatch({
      type: 'SET_HINT_REQUEST_STATUS',
      hintRequestId,
      status,
      callerUsername,
    });
    let response = getState()
      .getIn(['callQueue', 'pendingHintRequests'])
      .find(hr => hr.get('hintRequestId') === hintRequestId)
      .get('response');
    if (!response && isCompleteHintRequestStatus(status)) {
      response = '';
    }
    return fetchToAction(
      createPostRequest(
        getState(),
        `hintrequests/${hintRequestId}`,
        {
          status,
          response,
        }),
      'SET_HINT_REQUEST_STATUS_DONE',
      (json, action) => ({
        ...action,
        hintRequestId,
        status,
        callerUsername,
      }))
      .then(action => {
        dispatch(action);
        if (action.error || isCompleteHintRequestStatus(status)) {
          dispatch(refresh());
        }
      });
  };
}

export function changeHintRequestResponse(hintRequestId, response) {
  return {
    type: 'CHANGE_HINT_REQUEST_RESPONSE',
    hintRequestId,
    response,
  };
}
