import { List, Map, fromJS } from 'immutable';
import { checkForError } from './reducer_utils';

const INITIAL_STATE = new Map({
  submissions: List.of(),
  refreshTimestamp: null,
  autoRefresh: false,
  autoRefreshTimer: null,
  showComplete: false,
});

export default function (oldState = INITIAL_STATE, action) {
  let state = oldState;
  switch (action.type) {
  case 'CALL_QUEUE_FETCH_SUBMISSIONS':
    state = checkForError(state, action);
    if (action.submissions) {
      state = state
        .set('submissions', fromJS(action.submissions))
        .set('refreshTimestamp', action.timestamp);
    }
    return state;
  case 'CALL_QUEUE_TOGGLE_SHOW_COMPLETE':
    return state.set('showComplete', !state.get('showComplete'));
  case 'CALL_QUEUE_TOGGLE_AUTO_REFRESH':
    if (!state.get('autoRefresh')) {
      return state
        .set('autoRefresh', true)
        .set('autoRefreshTimer', action.timer);
    }
    return state
      .set('autoRefresh', false)
      .set('autoRefreshTimer', null);
  case 'CALL_QUEUE_SET_STATUS':
    return state.updateIn(
      [
        'submissions',
        state.get('submissions').findIndex(
          submission => submission.get('submissionId') === action.submissionId),
      ],
      submission => submission.set('status', action.status));
  default:
    return state;
  }
}
