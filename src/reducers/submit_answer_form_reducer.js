import { List, Map } from 'immutable';
import { setListDefault } from './reducer_utils';

const INITIAL_STATE = new Map({
  teamId: '',
  puzzleIds: List.of(),
  puzzleId: '',
  submission: '',
  submitting: false,
});

export default function (oldState = INITIAL_STATE, action) {
  let state = oldState;
  switch (action.type) {

  case 'FETCH_TEAMS':
    if (action.teams) {
      state = setListDefault(
        state,
        action.teams.map(team => team.teamId),
        'teamId');
    }
    return state;

  case 'SUBMIT_ANSWER_FORM_FETCH_PUZZLES':
    if (action.puzzleIds) {
      state = state.set('puzzleIds', new List(action.puzzleIds));
      state = setListDefault(state, action.puzzleIds, 'puzzleId');
    }
    return state;

  case 'SUBMIT_ANSWER_FORM_CHANGE_TEAM':
    return state.set('teamId', action.teamId);

  case 'SUBMIT_ANSWER_FORM_CHANGE_PUZZLE':
    return state.set('puzzleId', action.puzzleId);

  case 'SUBMIT_ANSWER_FORM_CHANGE_SUBMISSION':
    return state.set('submission', action.submission);

  case 'SUBMIT_ANSWER_FORM_SUBMIT':
    return state.set('submitting', true);

  case 'SUBMIT_ANSWER_FORM_SUBMIT_DONE':
    return state
      .set('submitting', false)
      .set('submission', '');

  default:
    return state;
  }
}
