import React from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import { connect } from 'react-redux';

import * as actions from '../actions/edit_user_form_actions';

import { RoleEditor } from './RoleEditor';

class EditUserForm extends React.Component {
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
          Edit Existing User
        </span>

        <div className="ha-labeled-input-form">
          <label>
            Username

            <select
              value={this.props.username}
              onChange={this.props.changeUsername}
              {...inputAttrs}
            >
              {this.props.users.map(user => {
                const username = user.get('username');
                return (
                  <option key={username} value={username}>{username}</option>
                );
              })}
            </select>

            <button type="button" onClick={this.props.refresh}>
              Refresh Now
            </button>
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

          <label>
            Roles
            <RoleEditor
              roles={this.props.roles}
              inputAttrs={inputAttrs}
              addRole={this.props.addRole}
              removeRole={this.props.removeRole}
            />
          </label>
        </div>

        <input type="submit" {...submitAttrs} />
      </form>
    );
  }
}

export const EditUserFormContainer = connect(
  state => ({
    users: state.getIn(['common', 'users']),
    username: state.getIn(['editUserForm', 'username']),
    password: state.getIn(['editUserForm', 'password']),
    roles: state.getIn(['editUserForm', 'roles']),
    submitting: state.getIn(['editUserForm', 'submitting']),
  }),
  {
    refresh: actions.refresh,
    changeUsername: event => actions.changeUsername(event.target.value),
    changePassword: event => actions.changePassword(event.target.value),
    addRole: role => actions.addRole(role),
    removeRole: role => actions.removeRole(role),
    submit: actions.submit,
  })(EditUserForm);

