import { List, Map } from 'immutable';
import { checkForError, setListDefault } from './reducer_utils';

const INITIAL_STATE = new Map({
  teamIds: List.of(),
  teamId: '',
  puzzleIds: List.of(),
  puzzleId: '',
  submission: '',
});

export default function (oldState = INITIAL_STATE, action) {
  let state = oldState;
  switch (action.type) {
  case 'SUBMIT_ANSWER_FORM_FETCH_TEAMS':
    state = checkForError(state, action);
    if (action.teamIds) {
      state = state.set('teamIds', new List(action.teamIds));
      state = setListDefault(state, 'teamIds', 'teamId');
    }
    return state;
  case 'SUBMIT_ANSWER_FORM_FETCH_PUZZLES':
    state = checkForError(state, action);
    if (action.puzzleIds) {
      state = state.set('puzzleIds', new List(action.puzzleIds));
      state = setListDefault(state, 'puzzleIds', 'puzzleId');
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
    state = checkForError(state, action);
    return state
      .delete('submitting')
      .set('submission', '');
  default:
    return state;
  }
}
