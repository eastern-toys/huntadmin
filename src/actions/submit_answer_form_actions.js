import _ from 'lodash';
import { createGetRequest, createPostRequest, fetchToAction } from './action_utils';

export function fetchPuzzles() {
  return (dispatch, getState) => {
    const teamId = getState().getIn(['submitAnswerForm', 'teamId']);
    return fetchToAction(
      createGetRequest(`visibilities?teamId=${teamId}`),
      'SUBMIT_ANSWER_FORM_FETCH_PUZZLES',
      (json, action) => ({
        ...action,
        puzzleIds: _.chain(json.visibilities)
          .filter(_.matchesProperty('status', 'UNLOCKED'))
          .map(_.property('puzzleId'))
          .value(),
      }))
      .then(dispatch);
  };
}

export function changeTeam(teamId) {
  return dispatch => {
    dispatch({
      type: 'SUBMIT_ANSWER_FORM_CHANGE_TEAM',
      teamId,
    });
    return dispatch(fetchPuzzles());
  };
}

export function changePuzzle(puzzleId) {
  return {
    type: 'SUBMIT_ANSWER_FORM_CHANGE_PUZZLE',
    puzzleId,
  };
}

export function changeSubmission(submission) {
  return {
    type: 'SUBMIT_ANSWER_FORM_CHANGE_SUBMISSION',
    submission,
  };
}

export function submit() {
  return (dispatch, getState) => {
    dispatch({
      type: 'SUBMIT_ANSWER_FORM_SUBMIT',
    });
    return fetchToAction(
      createPostRequest('submissions', {
        teamId: getState().getIn(['submitAnswerForm', 'teamId']),
        puzzleId: getState().getIn(['submitAnswerForm', 'puzzleId']),
        submission: getState().getIn(['submitAnswerForm', 'submission']),
      }),
      'SUBMIT_ANSWER_FORM_SUBMIT_DONE',
      (json, action) => action)
      .then(dispatch);
  };
}
