import React from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import { connect } from 'react-redux';
import { timestampToString } from '../util/timestamp';

import { AutoRefreshControlsContainer } from './AutoRefreshControls';

import * as actions from '../actions/call_queue_actions.js';

class SubmissionRow extends React.Component {
  constructor() {
    super();
    this.setSubmitted = this.setSubmitted.bind(this);
    this.setAssigned = this.setAssigned.bind(this);
    this.setCorrect = this.setCorrect.bind(this);
    this.setIncorrect = this.setIncorrect.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  setStatus(status) {
    this.props.setStatus(this.props.submission.get('submissionId'), status);
  }

  setSubmitted() {
    this.setStatus('SUBMITTED');
  }

  setAssigned() {
    this.setStatus('ASSIGNED');
  }

  setCorrect() {
    this.setStatus('CORRECT');
  }

  setIncorrect() {
    this.setStatus('INCORRECT');
  }

  renderTimestamp() {
    return timestampToString(this.props.submission.get('timestamp'));
  }

  renderActions() {
    switch (this.props.submission.get('status')) {
    case 'SUBMITTED':
      return (
        <button type="button" onClick={this.setAssigned}>
          Claim
        </button>
      );
    case 'ASSIGNED':
      if (this.props.username === this.props.submission.get('callerUsername')) {
        return (
          <div className="ha-button-row">
            <button type="button" onClick={this.setSubmitted}>
              Unassign
            </button>
            <button type="button" onClick={this.setCorrect}>
              Correct
            </button>
            <button type="button" onClick={this.setIncorrect}>
              Incorrect
            </button>
          </div>
        );
      }
      return (
        <div className="ha-button-row">
          <button type="button" onClick={this.setSubmitted}>
            Unassign
          </button>
        </div>
      );
    case 'CORRECT':
      return <span>Correct</span>;
    case 'INCORRECT':
      return <span>Incorrect</span>;
    default:
      return <span>Unknown submission status</span>;
    }
  }

  render() {
    const submission = this.props.submission;
    let caller = 'unassigned';
    if (submission.get('callerUsername')) {
      caller = submission.get('callerUsername');
    }
    return (
      <tr>
        <td>{this.renderTimestamp()}</td>
        <td>{submission.get('teamId')}</td>
        <td>{submission.get('puzzleId')}</td>
        <td>{submission.get('submission')}</td>
        <td>{caller}</td>
        <td>{this.renderActions()}</td>
      </tr>
    );
  }
}

class SubmissionTable extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  render() {
    return (
      <table className="ha-table ha-table-responsive">
        <thead>
          <tr>
            <th>Submission Time</th>
            <th>Team</th>
            <th>Puzzle</th>
            <th>Answer</th>
            <th>Caller</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {this.props.submissions.map(submission => (
            <SubmissionRow
              key={submission.get('submissionId')}
              submission={submission}
              username={this.props.username}
              setStatus={this.props.setStatus}
            />
          ))}
        </tbody>
      </table>
    );
  }
}

class CallQueue extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  render() {
    return (
      <div>
        <div className="ha-control-boxes-container">
          <AutoRefreshControlsContainer />
        </div>
        <div className="ha-page-section">
          <h2>Your Claimed Submissions</h2>
          <SubmissionTable
            submissions={this.props.pendingSubmissions.filter(
              s => s.get('callerUsername') === this.props.username)}
            username={this.props.username}
            setStatus={this.props.setStatus}
          />
          <h2>All Pending Submissions</h2>
          <SubmissionTable
            submissions={this.props.pendingSubmissions}
            username={this.props.username}
            setStatus={this.props.setStatus}
          />
        </div>
      </div>
    );
  }
}

export const CallQueueContainer = connect(
  state => ({
    username: state.getIn(['auth', 'username']),
    pendingSubmissions: state.getIn(['callQueue', 'pendingSubmissions']),
  }),
  {
    setStatus: actions.setStatus,
  })(CallQueue);
