import { List, Map, fromJS } from 'immutable';

const INITIAL_STATE = new Map({
  cubeApiServer: 'http://unknown-cube-api-server',

  submissions: List.of(),
  teamIds: List.of(),
  users: List.of(),

  autoRefresh: false,
  autoRefreshTimer: null,
  refreshTimestamp: null,
});

export default function (oldState = INITIAL_STATE, action) {
  let state = oldState;
  switch (action.type) {

  case 'SET_CUBE_API_SERVER':
    if (action.cubeApiServer) {
      state = state.set('cubeApiServer', action.cubeApiServer);
    }
    return state;

  case 'FETCH_TEAMS':
    if (action.teamIds) {
      state = state.set('teamIds', new List(action.teamIds));
    }
    return state;

  case 'FETCH_USERS':
    if (action.users) {
      state = state.set('users', fromJS(action.users));
    }
    return state;

  case 'REFRESH_COMPLETE':
    return state.set('refreshTimestamp', action.timestamp);

  case 'TOGGLE_AUTO_REFRESH':
    if (!state.get('autoRefresh')) {
      return state
        .set('autoRefresh', true)
        .set('autoRefreshTimer', action.timer);
    }
    return state
      .set('autoRefresh', false)
      .set('autoRefreshTimer', null);

  default:
    return state;
  }
}
