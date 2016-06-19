import React from 'react';
import shallowCompare from 'react-addons-shallow-compare';

export class RoleEditor extends React.Component {
  constructor() {
    super();
    this.handleRoleChange = this.handleRoleChange.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  handleRoleChange(event) {
    const role = event.target.getAttribute('data-role');
    const checked = event.target.checked;
    if (checked) {
      this.props.addRole(role);
    } else {
      this.props.removeRole(role);
    }
  }

  render() {
    // TODO: fetch list of roles from Cube server
    const roles = ['writingteam', 'admin'];
    return (
      <div className="ha-labeled-input-form">
        {roles.map(role =>
          <label key={role}>
            <input
              type="checkbox"
              data-role={role}
              checked={this.props.roles.includes(role)}
              onChange={this.handleRoleChange}
              {...this.props.inputAttrs}
            />
            {role}
          </label>
        )}
      </div>
    );
  }
}
