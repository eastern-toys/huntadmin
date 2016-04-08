import * as _ from 'lodash';
import React from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import { connect } from 'react-redux';

import { AutoRefreshControlsContainer } from './AutoRefreshControls';
import { ScatterChart } from './ScatterChart';
import { TimestampedEventChart } from './TimestampedEventChart';

class HuntStatus extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  render() {
    const submissions = this.props.submissions.toJS();
    const visibilityChanges = this.props.visibilityChanges.toJS();

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

    const correctSubmissionsData = _.chain(submissions)
      .groupBy('teamId')
      .map((teamSubmissions, teamId) => ({
        label: teamId,
        x: teamSubmissions.length,
        y: _.filter(teamSubmissions, s => s.status === 'CORRECT').length,
      }))
      .values()
      .value();

    return (
      <div>
        <div className="ha-control-boxes-container">
          <AutoRefreshControlsContainer />
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
        <ScatterChart
          title="Submissions by Team"
          xAxisLabel="Total Submissions"
          yAxisLabel="Correct Submissions"
          width="1000"
          height="500"
          axisSize="30"
          paddingRight="50"
          data={correctSubmissionsData}
        />
      </div>
    );
  }
}

export const HuntStatusContainer = connect(
  state => ({
    submissions: state.getIn(['common', 'submissions']),
    visibilityChanges: state.getIn(['common', 'visibilityChanges']),
  }),
  {})(HuntStatus);
