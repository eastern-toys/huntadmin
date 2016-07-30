import { fromJS, List, Map } from 'immutable';

const INITIAL_STATE = new Map({
  pendingSubmissions: List.of(),
});

export default function (oldState = INITIAL_STATE, action) {
  let state = oldState;
  switch (action.type) {

  case 'FETCH_PENDING_SUBMISSIONS':
    if (action.submissions) {
      state = state.set('pendingSubmissions', fromJS(action.submissions));
    }
    return state;

  case 'SET_SUBMISSION_STATUS':
    return state.updateIn(
      [
        'pendingSubmissions',
        state.get('pendingSubmissions').findIndex(
          submission => submission.get('submissionId') === action.submissionId),
      ],
      submission => submission
        .set('status', action.status)
        .set('callerUsername', action.callerUsername));

  default:
    return state;
  }
}
