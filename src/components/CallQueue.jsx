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

  renderTeam() {
    if (this.props.team) {
      return (
        <div>
          {this.props.team.get('teamId')}<br />
          {this.props.team.get('email')}<br />
          {this.props.team.get('primaryPhone')}<br />
          {this.props.team.get('secondaryPhone')}
        </div>
      );
    }
    return this.props.submission.get('teamId');
  }

  renderPuzzle() {
    if (this.props.puzzle) {
      return (
        <div>
          {this.props.puzzle.get('displayName')}<br />
          {this.props.puzzle.get('puzzleId')}
        </div>
      );
    }
    return this.props.submission.get('puzzleId');
  }

  renderAnswer() {
    if (this.props.puzzle) {
      // TODO: display acceptable answers in addition to canonical answers
      return (
        <div>
          {this.props.submission.get('submission')}<br />
          {this.props.puzzle.get('answers').map(answer => (
            <span
              className="ha-call-queue-correct-answer"
              key={answer.get('canonicalAnswer')}
            >
              {answer.get('canonicalAnswer')}
            </span>
          ))}
        </div>
      );
    }
    return this.props.submission.get('submission');
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
        <td>{this.renderTeam()}</td>
        <td>{this.renderPuzzle()}</td>
        <td>{this.renderAnswer()}</td>
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
              team={this.props.teams ?
                    this.props.teams.get(submission.get('teamId')) :
                    undefined}
              puzzle={this.props.puzzles ?
                      this.props.puzzles.get(submission.get('puzzleId')) :
                      undefined}
              username={this.props.username}
              setStatus={this.props.setStatus}
            />
          ))}
        </tbody>
      </table>
    );
  }
}

class HintRequestRow extends React.Component {
  constructor() {
    super();
    this.setRequested = this.setRequested.bind(this);
    this.setAssigned = this.setAssigned.bind(this);
    this.setAnswered = this.setAnswered.bind(this);
    this.setRejected = this.setRejected.bind(this);
    this.changeResponse = this.changeResponse.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  setStatus(status) {
    this.props.setStatus(this.props.hintRequest.get('hintRequestId'), status);
  }

  setRequested() {
    this.setStatus('REQUESTED');
  }

  setAssigned() {
    this.setStatus('ASSIGNED');
  }

  setAnswered() {
    this.setStatus('ANSWERED');
  }

  setRejected() {
    this.setStatus('REJECTED');
  }

  changeResponse(event) {
    this.props.changeResponse(
      this.props.hintRequest.get('hintRequestId'),
      event.target.value);
  }

  renderTeam() {
    if (this.props.team) {
      return (
        <div>
          {this.props.team.get('teamId')}<br />
          {this.props.team.get('email')}<br />
          {this.props.team.get('primaryPhone')}<br />
          {this.props.team.get('secondaryPhone')}
        </div>
      );
    }
    return this.props.hintRequest.get('teamId');
  }

  renderPuzzle() {
    if (this.props.puzzle) {
      return (
        <div>
          {this.props.puzzle.get('displayName')}<br />
          {this.props.puzzle.get('puzzleId')}
        </div>
      );
    }
    return this.props.hintRequest.get('puzzleId');
  }

  renderTimestamp() {
    return timestampToString(this.props.hintRequest.get('timestamp'));
  }

  renderActions() {
    switch (this.props.hintRequest.get('status')) {
    case 'REQUESTED':
      return (
        <button type="button" onClick={this.setAssigned}>
          Claim
        </button>
      );
    case 'ASSIGNED':
      if (this.props.username === this.props.hintRequest.get('callerUsername')) {
        let response = this.props.hintRequest.get('response');
        if (!response) {
          response = '';
        }
        return (
          <div>
            <div className="ha-button-row">
              <button type="button" onClick={this.setRequested}>
                Unassign
              </button>
            </div>
            <div className="ha-button-row">
              <input
                type="text"
                value={response}
                onChange={this.changeResponse}
              />
              <button type="button" onClick={this.setAnswered}>
                Answer
              </button>
              <button type="button" onClick={this.setRejected}>
                Reject
              </button>
            </div>
          </div>
        );
      }
      return (
        <div className="ha-button-row">
          <button type="button" onClick={this.setRequested}>
            Unassign
          </button>
        </div>
      );
    case 'ANSWERED':
      return <span>Answered</span>;
    case 'REJECTED':
      return <span>Rejected</span>;
    default:
      return <span>Unknown hint request status</span>;
    }
  }

  render() {
    const hintRequest = this.props.hintRequest;
    let caller = 'unassigned';
    if (hintRequest.get('callerUsername')) {
      caller = hintRequest.get('callerUsername');
    }
    return (
      <tr>
        <td>{this.renderTimestamp()}</td>
        <td>{this.renderTeam()}</td>
        <td>{this.renderPuzzle()}</td>
        <td>{hintRequest.get('request')}</td>
        <td>{caller}</td>
        <td>{this.renderActions()}</td>
      </tr>
    );
  }
}

class HintRequestTable extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  render() {
    return (
      <table className="ha-table ha-table-responsive">
        <thead>
          <tr>
            <th>Request Time</th>
            <th>Team</th>
            <th>Puzzle</th>
            <th>Request</th>
            <th>Caller</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {this.props.hintRequests.map(hintRequest => (
            <HintRequestRow
              key={hintRequest.get('hintRequestId')}
              hintRequest={hintRequest}
              team={this.props.teams ?
                    this.props.teams.get(hintRequest.get('teamId')) :
                    undefined}
              puzzle={this.props.puzzles ?
                      this.props.puzzles.get(hintRequest.get('puzzleId')) :
                      undefined}
              username={this.props.username}
              setStatus={this.props.setStatus}
              changeResponse={this.props.changeResponse}
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
            teams={this.props.teams}
            puzzles={this.props.puzzles}
            username={this.props.username}
            setStatus={this.props.setStatus}
          />
          <h2>Pending Submissions</h2>
          <SubmissionTable
            submissions={this.props.pendingSubmissions.filter(
              s => s.get('callerUsername') !== this.props.username)}
            puzzles={this.props.puzzles}
            username={this.props.username}
            setStatus={this.props.setStatus}
          />

          <h2>Your Claimed Hint Requests</h2>
          <HintRequestTable
            hintRequests={this.props.pendingHintRequests.filter(
              hr => hr.get('callerUsername') === this.props.username)}
            teams={this.props.teams}
            puzzles={this.props.puzzles}
            username={this.props.username}
            setStatus={this.props.setHintRequestStatus}
            changeResponse={this.props.changeHintRequestResponse}
          />
          <h2>Pending Hint Requests</h2>
          <HintRequestTable
            hintRequests={this.props.pendingHintRequests.filter(
              hr => hr.get('callerUsername') !== this.props.username)}
            puzzles={this.props.puzzles}
            username={this.props.username}
            setStatus={this.props.setHintRequestStatus}
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
    pendingHintRequests: state.getIn(['callQueue', 'pendingHintRequests']),
    puzzles: state.getIn(['callQueue', 'puzzles']),
    teams: state.getIn(['common', 'teams']),
  }),
  {
    setStatus: actions.setStatus,
    setHintRequestStatus: actions.setHintRequestStatus,
    changeHintRequestResponse: actions.changeHintRequestResponse,
  })(CallQueue);
