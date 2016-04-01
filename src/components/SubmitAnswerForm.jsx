import React from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions/submit_answer_form_actions';

class SubmitAnswerForm extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
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
      <div>
        <div className="hunt-box-row">
          <form className="hunt-box-section" onSubmit={this.handleSubmit}>
            <button className="hunt-box-element" type="button" onClick={this.props.refresh}>
              Refresh Now
            </button>
            <select
              className="hunt-box-element"
              value={this.props.teamId}
              onChange={this.props.changeTeam}
              {...inputAttrs}
            >
              {this.props.teamIds.map(teamId => (
                <option key={teamId} value={teamId}>{teamId}</option>
              ))}
            </select>

            <select
              className="hunt-box-element"
              value={this.props.puzzleId}
              onChange={this.props.changePuzzle}
              {...inputAttrs}
            >
              {this.props.puzzleIds.map(puzzleId => (
                <option key={puzzleId} value={puzzleId}>{puzzleId}</option>
              ))}
            </select>

            <input
              className="hunt-box-element"
              type="text"
              value={this.props.submission}
              onChange={this.props.changeSubmission}
              {...inputAttrs}
            />

            <input className="hunt-box-element" type="submit" {...submitAttrs} />
          </form>
        </div>
      </div>
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
