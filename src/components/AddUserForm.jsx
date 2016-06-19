import React from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import { connect } from 'react-redux';

import * as actions from '../actions/add_user_form_actions';

import { RoleEditor } from './RoleEditor';

class AddUserForm extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  disableSubmit() {
    return this.props.submitting ||
      this.props.username.length === 0 ||
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
          Add New User
        </span>

        <div className="ha-labeled-input-form">
          <label>
            Username
            <input
              type="text"
              value={this.props.username}
              onChange={this.props.changeUsername}
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

export const AddUserFormContainer = connect(
  state => ({
    username: state.getIn(['addUserForm', 'username']),
    password: state.getIn(['addUserForm', 'password']),
    roles: state.getIn(['addUserForm', 'roles']),
    submitting: state.getIn(['addUserForm', 'submitting']),
  }),
  {
    changeUsername: event => actions.changeUsername(event.target.value),
    changePassword: event => actions.changePassword(event.target.value),
    addRole: role => actions.addRole(role),
    removeRole: role => actions.removeRole(role),
    submit: actions.submit,
  })(AddUserForm);

