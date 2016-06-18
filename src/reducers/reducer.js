import { combineReducers } from 'immutable-reducers';

import addTeamForm from './add_team_form_reducer';
import auth from './auth_reducer';
import callQueue from './call_queue_reducer';
import common from './common_reducer';
import error from './error_reducer';
import fullReleaseForm from './full_release_form_reducer';
import submitAnswerForm from './submit_answer_form_reducer';
import startHunt from './start_hunt_reducer';
import teamStatus from './team_status_reducer';

export default combineReducers({
  addTeamForm,
  auth,
  callQueue,
  common,
  error,
  fullReleaseForm,
  startHunt,
  submitAnswerForm,
  teamStatus,
});
