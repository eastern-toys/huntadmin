import { Map } from 'immutable';

const INITIAL_STATE = new Map({
  started: false,
});

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {

  case 'FETCH_VISIBILITY_CHANGES':
    if (action.visibilityChanges && action.visibilityChanges.length > 0) {
      return state.set('started', true);
    }
    return state;

  case 'START_HUNT':
    return state.set('started', true);

  default:
    return state;
  }
}
