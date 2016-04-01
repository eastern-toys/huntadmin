import { Map } from 'immutable';

const INITIAL_STATE = new Map({
  showComplete: false,
});

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {

  case 'CALL_QUEUE_TOGGLE_SHOW_COMPLETE':
    return state.set('showComplete', !state.get('showComplete'));

  default:
    return state;
  }
}
