import React from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import { connect } from 'react-redux';
import { timestampToString } from '../util/timestamp';

import * as actions from '../actions/common_actions.js';

class AutoRefreshControls extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  render() {
    return (
      <div className="ha-control-box">
        <button onClick={this.props.refresh}>Refresh Now</button>
        <span>
          Last refreshed {timestampToString(this.props.refreshTimestamp)}
        </span>
        <input
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
