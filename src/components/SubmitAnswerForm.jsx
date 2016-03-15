import React from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions/submit_answer_form_actions';

class SubmitAnswerForm extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  disableSubmit() {
    const state = this.props.state;
    return state.get('submitting') ||
      state.get('puzzleId').length === 0 ||
      state.get('submission').length === 0;
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.disableSubmit()) {
      return;
    }
    this.props.submit();
  }

  render() {
    const state = this.props.state;

    const inputAttrs = {};
    if (state.has('submitting')) {
      inputAttrs.disabled = 'disabled';
    }

    const submitAttrs = {};
    if (this.disableSubmit()) {
      submitAttrs.disabled = 'disabled';
    }

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
          <form className="hunt-box-section" onSubmit={this.handleSubmit}>
            <button className="hunt-box-element" type="button" onClick={this.props.refresh}>
              Refresh Now
            </button>
            <select
              className="hunt-box-element"
              value={state.get('teamId')}
              onChange={this.props.changeTeam}
              {...inputAttrs}
            >
              {state.get('teamIds').map(teamId => (
                <option key={teamId} value={teamId}>{teamId}</option>
              ))}
            </select>

            <select
              className="hunt-box-element"
              value={state.get('puzzleId')}
              onChange={this.props.changePuzzle}
              {...inputAttrs}
            >
              {state.get('puzzleIds').map(puzzleId => (
                <option key={puzzleId} value={puzzleId}>{puzzleId}</option>
              ))}
            </select>

            <input
              className="hunt-box-element"
              type="text"
              value={state.get('submission')}
              onChange={this.props.changeSubmission}
              {...inputAttrs}
            />

            <input className="hunt-box-element" type="submit" {...submitAttrs} />
          </form>
        </div>
        {errorDiv}
      </div>
    );
  }
}

export const SubmitAnswerFormContainer = connect(
  state => ({ state: state.get('submitAnswerForm') }),
  {
    refresh: actions.refreshTeams,
    changeTeam: event => actions.changeTeam(event.target.value),
    changePuzzle: event => actions.changePuzzle(event.target.value),
    changeSubmission: event => actions.changeSubmission(event.target.value),
    submit: actions.submit,
  })(SubmitAnswerForm);
