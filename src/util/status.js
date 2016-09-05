import _ from 'lodash';

const ASSIGNED_STATUSES = ['ASSIGNED', 'CORRECT', 'INCORRECT'];
const COMPLETE_STATUSES = ['CORRECT', 'INCORRECT'];

export function isAssignedStatus(status) {
  return _.indexOf(ASSIGNED_STATUSES, status) > -1;
}

export function isCompleteStatus(status) {
  return _.indexOf(COMPLETE_STATUSES, status) > -1;
}

const ASSIGNED_HINT_REQUEST_STATUSES = ['ASSIGNED', 'ANSWERED', 'REJECTED'];
const COMPLETE_HINT_REQUEST_STATUSES = ['ANSWERED', 'REJECTED'];

export function isAssignedHintRequestStatus(status) {
  return _.indexOf(ASSIGNED_HINT_REQUEST_STATUSES, status) > -1;
}

export function isCompleteHintRequestStatus(status) {
  return _.indexOf(COMPLETE_HINT_REQUEST_STATUSES, status) > -1;
}
