import { Map } from 'immutable';

const INITIAL_STATE = new Map({
  puzzleId: '',
  submitting: false,
});

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {

  case 'FULL_RELEASE_FORM_CHANGE_PUZZLE_ID':
    return state.set('puzzleId', action.puzzleId);

  case 'FULL_RELEASE_FORM_SUBMIT':
    return state.set('submitting', true);

  case 'FULL_RELEASE_FORM_SUBMIT_DONE':
    return state
      .set('submitting', false)
      .set('puzzleId', '');

  default:
    return state;
  }
}
