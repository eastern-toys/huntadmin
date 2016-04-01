import { combineReducers } from 'immutable-reducers';

import callQueue from './call_queue_reducer';
import common from './common_reducer';
import errorText from './error_text_reducer';
import submitAnswerForm from './submit_answer_form_reducer';
import teamStatus from './team_status_reducer';

export default combineReducers({
  callQueue,
  common,
  errorText,
  submitAnswerForm,
  teamStatus,
});
