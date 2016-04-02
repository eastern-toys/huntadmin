import React from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import { connect } from 'react-redux';

import * as actions from '../actions/full_release_form_actions';

class FullReleaseForm extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  disableSubmit() {
    return this.props.submitting ||
      this.props.puzzleId.length === 0;
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
      <div className="floating-hunt-box-section">
        <form onSubmit={this.handleSubmit}>
          <span className="hunt-box-element hunt-box-title">Full Puzzle Release</span>
          <input
            className="hunt-box-element"
            type="text"
            value={this.props.puzzleId}
            onChange={this.props.changePuzzleId}
            {...inputAttrs}
          />
          <input className="hunt-box-element" type="submit" {...submitAttrs} />
        </form>
      </div>
    );
  }
}

export const FullReleaseFormContainer = connect(
  state => ({
    puzzleId: state.getIn(['fullReleaseForm', 'puzzleId']),
    submitting: state.getIn(['fullReleaseForm', 'submitting']),
  }),
  {
    changePuzzleId: event => actions.changePuzzleId(event.target.value),
    submit: actions.submit,
  })(FullReleaseForm);
