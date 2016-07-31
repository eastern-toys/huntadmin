import React from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import { connect } from 'react-redux';

import * as actions from '../actions/edit_team_form_actions';

class EditTeamForm extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  disableSubmit() {
    return this.props.submitting;
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
          Edit Existing Team
        </span>

        <div className="ha-labeled-input-form">
          <label>
            Team ID

            <select
              value={this.props.teamId}
              onChange={this.props.changeTeamId}
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
            Email
            <input
              type="text"
              value={this.props.email}
              onChange={this.props.changeEmail}
              {...inputAttrs}
            />
          </label>

          <label>
            Primary Phone
            <input
              type="text"
              value={this.props.primaryPhone}
              onChange={this.props.changePrimaryPhone}
              {...inputAttrs}
            />
          </label>

          <label>
            Secondary Phone
            <input
              type="text"
              value={this.props.secondaryPhone}
              onChange={this.props.changeSecondaryPhone}
              {...inputAttrs}
            />
          </label>
        </div>

        <input type="submit" {...submitAttrs} />
      </form>
    );
  }
}

export const EditTeamFormContainer = connect(
  state => ({
    teamIds: state.getIn(['common', 'teamIds']),
    teamId: state.getIn(['editTeamForm', 'teamId']),
    email: state.getIn(['editTeamForm', 'email']),
    primaryPhone: state.getIn(['editTeamForm', 'primaryPhone']),
    secondaryPhone: state.getIn(['editTeamForm', 'secondaryPhone']),
    submitting: state.getIn(['editTeamForm', 'submitting']),
  }),
  {
    refresh: actions.refresh,
    changeTeamId: event => actions.changeTeamId(event.target.value),
    changeEmail: event => actions.changeEmail(event.target.value),
    changePrimaryPhone: event => actions.changePrimaryPhone(event.target.value),
    changeSecondaryPhone: event => actions.changeSecondaryPhone(event.target.value),
    submit: actions.submit,
  })(EditTeamForm);

