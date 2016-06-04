import { createPostRequest, fetchToAction } from './action_utils';

export function changePuzzleId(puzzleId) {
  return {
    type: 'FULL_RELEASE_FORM_CHANGE_PUZZLE_ID',
    puzzleId,
  };
}

export function submit() {
  return (dispatch, getState) => {
    dispatch({
      type: 'FULL_RELEASE_FORM_SUBMIT',
    });
    return fetchToAction(
      createPostRequest('events', {
        eventType: 'FullRelease',
        puzzleId: getState().getIn(['fullReleaseForm', 'puzzleId']),
      }),
      'FULL_RELEASE_FORM_SUBMIT_DONE',
      (json, action) => action)
      .then(dispatch);
  };
}
