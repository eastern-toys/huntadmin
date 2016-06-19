import React from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import { connect } from 'react-redux';

import * as actions from '../actions/submit_answer_form_actions';

class SubmitAnswerForm extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  disableSubmit() {
    return this.props.submitting ||
      this.props.puzzleId.length === 0 ||
      this.props.submission.length === 0;
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.disableSubmit()) {
      return;
    }
    this.props.submit();
  }

  render() {
    const inputAttrs = {};
    if (this.props.submitting) {
      inputAttrs.disabled = 'disabled';
    }

    const submitAttrs = {};
    if (this.disableSubmit()) {
      submitAttrs.disabled = 'disabled';
    }

    return (
      <form
        className="ha-column-control-box"
        onSubmit={this.handleSubmit}
      >
        <span className="ha-control-box-title">
          Submit Answer
        </span>

        <div className="ha-labeled-input-form">
          <label>
            Team ID

            <select
              value={this.props.teamId}
              onChange={this.props.changeTeam}
              {...inputAttrs}
            >
              {this.props.teamIds.map(teamId => (
                <option key={teamId} value={teamId}>{teamId}</option>
              ))}
            </select>

            <button type="button" onClick={this.props.refresh}>
              Refresh Now
            </button>
          </label>

          <label>
            Puzzle ID

            <select
              value={this.props.puzzleId}
              onChange={this.props.changePuzzle}
              {...inputAttrs}
            >
              {this.props.puzzleIds.map(puzzleId => (
                <option key={puzzleId} value={puzzleId}>{puzzleId}</option>
              ))}
            </select>
          </label>

          <label>
            Answer

            <input
              type="text"
              value={this.props.submission}
              onChange={this.props.changeSubmission}
              {...inputAttrs}
            />
          </label>
        </div>
        <input type="submit" {...submitAttrs} />
      </form>
    );
  }
}

export const SubmitAnswerFormContainer = connect(
  state => ({
    teamIds: state.getIn(['common', 'teamIds']),
    teamId: state.getIn(['submitAnswerForm', 'teamId']),
    puzzleIds: state.getIn(['submitAnswerForm', 'puzzleIds']),
    puzzleId: state.getIn(['submitAnswerForm', 'puzzleId']),
    submission: state.getIn(['submitAnswerForm', 'submission']),
    submitting: state.getIn(['submitAnswerForm', 'submitting']),
  }),
  {
    refresh: actions.fetchPuzzles,
    changeTeam: event => actions.changeTeam(event.target.value),
    changePuzzle: event => actions.changePuzzle(event.target.value),
    changeSubmission: event => actions.changeSubmission(event.target.value),
    submit: actions.submit,
  })(SubmitAnswerForm);
