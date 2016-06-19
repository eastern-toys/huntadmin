import React from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import { connect } from 'react-redux';

import { AutoRefreshControlsContainer } from './AutoRefreshControls';

class UserRow extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  render() {
    const user = this.props.user;
    return (
      <tr>
        <td>{user.get('username')}</td>
        <td>{user.get('teamId')}</td>
        <td>{user.get('roles').join(' ')}</td>
      </tr>
    );
  }
}

class Users extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  render() {
    return (
      <div>
        <div className="ha-control-boxes-container">
          <AutoRefreshControlsContainer />
        </div>
        <div className="ha-page-section">
          <table className="ha-table ha-table-responsive">
            <thead>
              <tr>
                <th>Username</th>
                <th>Team</th>
                <th>User Roles</th>
              </tr>
            </thead>
            <tbody>
              {this.props.users.map(user =>
                <UserRow
                  key={user.get('username')}
                  user={user}
                />
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export const UsersContainer = connect(
  state => ({
    users: state.getIn(['common', 'users']),
  }),
  {
  })(Users);
