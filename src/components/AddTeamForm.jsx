import React from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import { connect } from 'react-redux';

import * as actions from '../actions/add_team_form_actions';

class AddTeamForm extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  disableSubmit() {
    return this.props.submitting ||
      this.props.teamId.length === 0 ||
      this.props.password.length === 0;
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
          Add New Team
        </span>

        <div className="ha-labeled-input-form">
          <label>
            Team ID
            <input
              type="text"
              value={this.props.teamId}
              onChange={this.props.changeTeamId}
              {...inputAttrs}
            />
          </label>

          <label>
            Password
            <input
              type="password"
              value={this.props.password}
              onChange={this.props.changePassword}
              {...inputAttrs}
            />
          </label>
        </div>

        <input type="submit" {...submitAttrs} />
      </form>
    );
  }
}

export const AddTeamFormContainer = connect(
  state => ({
    teamId: state.getIn(['addTeamForm', 'teamId']),
    password: state.getIn(['addTeamForm', 'password']),
    submitting: state.getIn(['addTeamForm', 'submitting']),
  }),
  {
    changeTeamId: event => actions.changeTeamId(event.target.value),
    changePassword: event => actions.changePassword(event.target.value),
    submit: actions.submit,
  })(AddTeamForm);

