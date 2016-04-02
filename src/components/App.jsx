import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import * as actions from '../actions/app_actions.js';

class App extends React.Component {
  render() {
    let errorBar = '';
    if (this.props.errorText) {
      errorBar = (
        <div className="error-bar">
          <span>{this.props.errorText}</span>
          <button type="button" onClick={this.props.dismissError}>
            Dismiss
          </button>
        </div>
      );
    }
    return (
      <div>
        <div className="navbar">
          <Link to={'/callqueue'} activeClassName="active">
            Call Queue
          </Link>
          <Link to={'/huntstatus'} activeClassName="active">
            Hunt Status
          </Link>
          <Link to={'/teamstatus'} activeClassName="active">
            Team Status
          </Link>
          <Link to={'/admintools'} activeClassName="active">
            Admin Tools
          </Link>
          <div className="status">
            Mystery Hunt Admin Console
          </div>
        </div>
        {errorBar}
        {this.props.children}
      </div>
    );
  }
}

export const AppContainer = connect(
  state => ({
    errorText: state.get('errorText'),
  }),
  {
    dismissError: actions.dismissError,
  })(App);
