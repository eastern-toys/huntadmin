import React from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions/call_queue_actions.js';

const DATE_STRING_OPTIONS = {
  month: 'short',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
};

function timestampToString(timestamp) {
  if (!timestamp) {
    return 'never';
  }
  return new Date(timestamp).toLocaleDateString('en', DATE_STRING_OPTIONS);
}

class RefreshControls extends React.Component {
  render() {
    const autoRefreshAttrs = {};
    if (this.props.autoRefresh) {
      autoRefreshAttrs.checked = true;
    }

    return (
      <div className="hunt-box-section">
        <button className="hunt-box-element" onClick={this.props.refresh}>Refresh Now</button>
        <span className="hunt-box-element">
          Last refreshed {timestampToString(this.props.refreshTimestamp)}
        </span>
        <input
          className="hunt-box-element"
          type="checkbox"
          {...autoRefreshAttrs}
          onChange={this.props.toggleAutoRefresh}
        />
        <span>auto refresh</span>
      </div>
    );
  }
}

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
    this.props.setStatus(this.props.state.get('submissionId'), status);
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
    return timestampToString(this.props.state.get('timestamp'));
  }

  renderActions() {
    switch (this.props.state.get('status')) {
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
    const state = this.props.state;
    return (
      <tr>
        <td>{this.renderTimestamp()}</td>
        <td>{state.get('teamId')}</td>
        <td>{state.get('puzzleId')}</td>
        <td>{state.get('submission')}</td>
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
    const state = this.props.state;

    let errorDiv = '';
    if (state.has('errorText')) {
      errorDiv = (
        <div className="error-text-container">
          {state.get('errorText')}
        </div>
      );
    }

    return (
      <div>
        <div className="hunt-box-row">
          <RefreshControls
            refreshTimestamp={state.get('refreshTimestamp')}
            autoRefresh={state.get('autoRefresh')}
            refresh={this.props.refresh}
            toggleAutoRefresh={this.props.toggleAutoRefresh}
          />
          <ShowControls
            showComplete={state.get('showComplete')}
            toggleShowComplete={this.props.toggleShowComplete}
          />
        </div>
        {errorDiv}
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
            {state.get('submissions').filter(submission =>
              state.get('showComplete') || !isCompleteStatus(submission.get('status'))
            ).map(submission =>
              <SubmissionRow
                key={submission.get('submissionId')}
                state={submission}
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
  state => ({ state: state.get('callQueue') }),
  {
    refresh: actions.refreshSubmissions,
    toggleAutoRefresh: actions.toggleAutoRefresh,
    toggleShowComplete: actions.toggleShowComplete,
    setStatus: actions.setStatus,
  })(CallQueue);
