import * as commonActions from './common_actions';

export function refreshEvent(event) {
  switch (event.eventType) {
  case 'SubmissionChange':
    return commonActions.fetchSubmissions();
  }
}
