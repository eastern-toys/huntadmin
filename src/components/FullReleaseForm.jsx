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
      <form
        className="ha-column-control-box"
        onSubmit={this.handleSubmit}
      >
        <span className="ha-control-box-title">Full Puzzle Release</span>

        <div className="ha-labeled-input-form">
          <label>
            Puzzle ID

            <input
              type="text"
              value={this.props.puzzleId}
              onChange={this.props.changePuzzleId}
              {...inputAttrs}
            />
          </label>
        </div>

        <input type="submit" {...submitAttrs} />
      </form>
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
