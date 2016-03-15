import { List, Map, fromJS } from 'immutable';
import { checkForError, setListDefault } from './reducer_utils';

const INITIAL_STATE = new Map({
  teamIds: List.of(),
  teamId: '',
  visibilities: List.of(),
});

export default function (oldState = INITIAL_STATE, action) {
  let state = oldState;
  switch (action.type) {
  case 'TEAM_STATUS_FETCH_TEAMS':
    state = checkForError(state, action);
    if (action.teamIds) {
      state = state.set('teamIds', new List(action.teamIds));
      state = setListDefault(state, 'teamIds', 'teamId');
    }
    return state;
  case 'TEAM_STATUS_CHANGE_TEAM':
    return state.set('teamId', action.teamId);
  case 'TEAM_STATUS_FETCH_VISIBILITIES':
    state = checkForError(state, action);
    if (action.visibilities) {
      state = state.set('visibilities', fromJS(action.visibilities));
    }
    return state;
  default:
    return state;
  }
}
