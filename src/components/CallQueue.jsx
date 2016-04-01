import React from 'react';
import { connect } from 'react-redux';
import { timestampToString } from '../util/timestamp';

import { AutoRefreshControlsContainer } from './AutoRefreshControls';

import * as actions from '../actions/call_queue_actions.js';

class ShowControls extends React.Component {
  render() {
    const showCompleteAttrs = {};
    if (this.props.showComplete) {
      showCompleteAttrs.checked = true;
    }

    return (
      <div className="hunt-box-section">
        <input
          className="hunt-box-element"
          type="checkbox"
          {...showCompleteAttrs}
          onChange={this.props.toggleShowComplete}
        />
        <span>show complete submissions</span>
      </div>
    );
  }
}

class SubmissionRow extends React.Component {
  constructor() {
    super();
    this.setAssigned = this.setAssigned.bind(this);
    this.setCorrect = this.setCorrect.bind(this);
    this.setIncorrect = this.setIncorrect.bind(this);
  }

  setStatus(status) {
    this.props.setStatus(this.props.submission.get('submissionId'), status);
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
          Assign
        </button>
      );
    case 'ASSIGNED':
      return (
        <div>
          <button type="button" onClick={this.setCorrect}>
            Correct
          </button>
          <button type="button" onClick={this.setIncorrect}>
            Incorrect
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
    return (
      <tr>
        <td>{this.renderTimestamp()}</td>
        <td>{submission.get('teamId')}</td>
        <td>{submission.get('puzzleId')}</td>
        <td>{submission.get('submission')}</td>
        <td>{this.renderActions()}</td>
      </tr>
    );
  }
}

function isCompleteStatus(status) {
  return status === 'CORRECT' || status === 'INCORRECT';
}

class CallQueue extends React.Component {
  render() {
    return (
      <div>
        <div className="hunt-box-row">
          <AutoRefreshControlsContainer />
          <ShowControls
            showComplete={this.props.showComplete}
            toggleShowComplete={this.props.toggleShowComplete}
          />
        </div>
        <table className="hunt-table">
          <thead>
            <tr>
              <th>Submission Time</th>
              <th>Team</th>
              <th>Puzzle</th>
              <th>Answer</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {this.props.submissions.filter(submission =>
              this.props.showComplete || !isCompleteStatus(submission.get('status'))
            ).map(submission =>
              <SubmissionRow
                key={submission.get('submissionId')}
                submission={submission}
                setStatus={this.props.setStatus}
              />
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

export const CallQueueContainer = connect(
  state => ({
    submissions: state.getIn(['common', 'submissions']),
    showComplete: state.getIn(['callQueue', 'showComplete']),
  }),
  {
    toggleShowComplete: actions.toggleShowComplete,
    setStatus: actions.setStatus,
  })(CallQueue);
