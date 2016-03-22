import * as _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';

import { TimestampedEventChart } from './TimestampedEventChart';

import * as actions from '../actions/hunt_status_actions.js';

class Refresher extends React.Component {
  render() {
    return (
      <div className="hunt-box-section">
        <button className="hunt-box-element" type="button" onClick={this.props.refresh}>
          Refresh Now
        </button>
      </div>
    );
  }
}

class HuntStatus extends React.Component {
  render() {
    const state = this.props.state;
    const visibilityChanges = state.get('visibilityChanges').toJS();

    const solvesByTeamData = _.chain(visibilityChanges)
      .filter(change => change.status === 'SOLVED')
      .groupBy('teamId')
      .map((changes, teamId) => ({
        label: teamId,
        timestamps: _.map(changes, _.property('timestamp')),
      }))
      .value();

    const unlocksByTeamData = _.chain(visibilityChanges)
      .filter(change => change.status === 'UNLOCKED')
      .groupBy('teamId')
      .map((changes, teamId) => ({
        label: teamId,
        timestamps: _.map(changes, _.property('timestamp')),
      }))
      .value();

    return (
      <div>
        <div className="hunt-box-row">
          <Refresher
            refresh={this.props.refresh}
          />
        </div>
        <TimestampedEventChart
          title="Solves by Team"
          width="1000"
          height="500"
          axisSize="30"
          paddingRight="50"
          data={solvesByTeamData}
        />
        <TimestampedEventChart
          title="Unlocks by Team"
          width="1000"
          height="500"
          axisSize="30"
          paddingRight="50"
          data={unlocksByTeamData}
        />
      </div>
    );
  }
}

export const HuntStatusContainer = connect(
  state => ({ state: state.get('huntStatus') }),
  {
    refresh: actions.refreshVisibilityHistory,
  })(HuntStatus);
