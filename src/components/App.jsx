import React from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router';

import * as actions from '../actions/app_actions.js';

class App extends React.Component {
  constructor() {
    super();
    this.logout = this.logout.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  logout() {
    this.props.logout(this.props.router);
    return false;
  }

  render() {
    let errorBar = '';
    if (this.props.errorText) {
      errorBar = (
        <div className="ha-page-section ha-error-bar">
          <span>{this.props.errorText}</span>
          <button type="button" onClick={this.props.dismissError}>
            Dismiss
          </button>
        </div>
      );
    }

    let links;
    let logoutLink = '';
    if (this.props.loggedIn) {
      links = [
        { link: '/callqueue', title: 'Call Queue' },
        { link: '/huntstatus', title: 'Hunt Status' },
        { link: '/teamstatus', title: 'Team Status' },
        { link: '/admintools', title: 'Admin Tools' },
      ];
      logoutLink = (
        <span>
          &ndash;
          <a href="#" onClick={this.logout}>Log Out</a>
        </span>
      );
    } else {
      links = [
        { link: '/login', title: 'Login' },
      ];
    }

    return (
      <div>
        <div className="ha-navbar">
          {links.map(link =>
            <Link to={link.link} activeClassName="active" key={link.link}>
              {link.title}
            </Link>
          )}
          <div className="ha-navbar-title">
            Mystery Hunt Admin Console
            {logoutLink}
          </div>
        </div>
        {errorBar}
        {this.props.children}
      </div>
    );
  }
}

export const AppContainer = withRouter(connect(
  state => ({
    loggedIn: state.getIn(['auth', 'loggedIn']),
    errorText: state.get('errorText'),
  }),
  {
    dismissError: actions.dismissError,
    logout: router => actions.logout(router),
  })(App));
