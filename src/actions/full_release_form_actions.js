import { fetchToAction } from './action_utils';

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
      new Request(
        `${CUBE_API_SERVER}/events`,
        {
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
          },
          body: JSON.stringify({
            eventType: 'FullRelease',
            puzzleId: getState().getIn(['fullReleaseForm', 'puzzleId']),
            runId: 'development',
          }),
          method: 'POST',
          mode: 'cors',
        }),
      'FULL_RELEASE_FORM_SUBMIT_DONE',
      (json, action) => action)
      .then(dispatch);
  };
}
