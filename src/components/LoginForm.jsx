import React from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import * as actions from '../actions/login_actions';

class LoginForm extends React.Component {
  constructor() {
    super();
    this.handleLogin = this.handleLogin.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  disableSubmit() {
    return this.props.loggingIn ||
      this.props.username.length === 0 ||
      this.props.password.length === 0;
  }

  handleLogin(event) {
    event.preventDefault();
    if (this.disableSubmit()) {
      return;
    }
    this.props.login(this.props.router);
  }

  render() {
    const inputAttrs = {};
    if (this.props.loggingIn) {
      inputAttrs.disabled = 'disabled';
    }

    const submitAttrs = {};
    if (this.disableSubmit()) {
      submitAttrs.disabled = 'disabled';
    }

    return (
      <div className="ha-control-boxes-container">
        <form className="ha-control-box" onSubmit={this.handleLogin}>
          <span className="ha-control-box-title">
            Log In
          </span>

          <div>
            <span>Username</span>
            <input
              type="text"
              value={this.props.username}
              onChange={this.props.changeUsername}
              {...inputAttrs}
            />
          </div>

          <div>
            <span>Password</span>
            <input
              type="password"
              value={this.props.password}
              onChange={this.props.changePassword}
              {...inputAttrs}
            />
          </div>

          <div>
            <input type="submit" value="Log In" {...submitAttrs} />
          </div>
        </form>
      </div>
    );
  }
}

export const LoginFormContainer = withRouter(connect(
  state => ({
    username: state.getIn(['auth', 'username']),
    password: state.getIn(['auth', 'password']),
    loggingIn: state.getIn(['auth', 'loggingIn']),
  }),
  {
    changeUsername: event => actions.changeUsername(event.target.value),
    changePassword: event => actions.changePassword(event.target.value),
    login: router => actions.login(router),
  })(LoginForm));
