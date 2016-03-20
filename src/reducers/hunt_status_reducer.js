import { List, Map, fromJS } from 'immutable';
import { checkForError } from './reducer_utils';

const INITIAL_STATE = new Map({
  visibilityChanges: List.of(),
});

export default function (oldState = INITIAL_STATE, action) {
  let state = oldState;
  switch (action.type) {
  case 'HUNT_STATUS_FETCH_VISIBILITY_HISTORY':
    state = checkForError(state, action);
    if (action.visibilityChanges) {
      state = state.set('visibilityChanges', fromJS(action.visibilityChanges));
    }
    return state;
  default:
    return state;
  }
}
