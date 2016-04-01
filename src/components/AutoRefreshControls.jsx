import React from 'react';
import { connect } from 'react-redux';
import { timestampToString } from '../util/timestamp';

import * as actions from '../actions/common_actions.js';

class AutoRefreshControls extends React.Component {
  render() {
    return (
      <div className="hunt-box-section">
        <button className="hunt-box-element" onClick={this.props.refresh}>Refresh Now</button>
        <span className="hunt-box-element">
          Last refreshed {timestampToString(this.props.refreshTimestamp)}
        </span>
        <input
          className="hunt-box-element"
          type="checkbox"
          checked={this.props.autoRefresh}
          onChange={this.props.toggleAutoRefresh}
        />
        <span>auto refresh</span>
      </div>
    );
  }
}

export const AutoRefreshControlsContainer = connect(
  state => ({
    autoRefresh: state.getIn(['common', 'autoRefresh']),
    refreshTimestamp: state.getIn(['common', 'refreshTimestamp']),
  }),
  {
    refresh: actions.refresh,
    toggleAutoRefresh: actions.toggleAutoRefresh,
  })(AutoRefreshControls);
