import { List, Map, fromJS } from 'immutable';

const INITIAL_STATE = new Map({
  submissions: List.of(),
  teamIds: List.of(),
  visibilityChanges: List.of(),

  autoRefresh: false,
  autoRefreshTimer: null,
  refreshTimestamp: null,
});

export default function (oldState = INITIAL_STATE, action) {
  let state = oldState;
  switch (action.type) {

  case 'FETCH_SUBMISSIONS':
    if (action.submissions) {
      state = state.set('submissions', fromJS(action.submissions));
    }
    return state;

  case 'SET_SUBMISSION_STATUS':
    return state.updateIn(
      [
        'submissions',
        state.get('submissions').findIndex(
          submission => submission.get('submissionId') === action.submissionId),
      ],
      submission => submission
        .set('status', action.status)
        .set('callerUsername', action.callerUsername));

  case 'FETCH_TEAMS':
    if (action.teamIds) {
      state = state.set('teamIds', new List(action.teamIds));
    }
    return state;

  case 'FETCH_VISIBILITY_CHANGES':
    if (action.visibilityChanges) {
      state = state.set('visibilityChanges', fromJS(action.visibilityChanges));
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
