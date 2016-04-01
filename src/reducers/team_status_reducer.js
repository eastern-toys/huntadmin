import { List, Map, fromJS } from 'immutable';
import { setListDefault } from './reducer_utils';

const INITIAL_STATE = new Map({
  teamId: '',
  visibilities: List.of(),
});

export default function (oldState = INITIAL_STATE, action) {
  let state = oldState;
  switch (action.type) {

  case 'FETCH_TEAMS':
    if (action.teamIds) {
      state = setListDefault(state, action.teamIds, 'teamId');
    }
    return state;

  case 'TEAM_STATUS_CHANGE_TEAM':
    return state.set('teamId', action.teamId);

  case 'TEAM_STATUS_FETCH_VISIBILITIES':
    if (action.visibilities) {
      state = state.set('visibilities', fromJS(action.visibilities));
    }
    return state;

  default:
    return state;
  }
}
