import { Map } from 'immutable';

const INITIAL_STATE = new Map({
  huntStarted: false,
});

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {

  case 'FETCH_HUNT_STARTED':
    if (action.huntStarted) {
      return state.set('huntStarted', true);
    }
    return state;

  case 'START_HUNT':
    return state.set('huntStarted', true);

  default:
    return state;
  }
}
