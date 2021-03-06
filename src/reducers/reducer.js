import { combineReducers } from 'immutable-reducers';

import addTeamForm from './add_team_form_reducer';
import addUserForm from './add_user_form_reducer';
import auth from './auth_reducer';
import callQueue from './call_queue_reducer';
import common from './common_reducer';
import editTeamForm from './edit_team_form_reducer';
import editUserForm from './edit_user_form_reducer';
import error from './error_reducer';
import fullReleaseForm from './full_release_form_reducer';
import huntState from './hunt_state_reducer';
import submitAnswerForm from './submit_answer_form_reducer';
import teamStatus from './team_status_reducer';

export default combineReducers({
  addTeamForm,
  addUserForm,
  auth,
  callQueue,
  common,
  editTeamForm,
  editUserForm,
  error,
  fullReleaseForm,
  huntState,
  submitAnswerForm,
  teamStatus,
});
