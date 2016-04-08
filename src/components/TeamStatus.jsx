import React from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import { connect } from 'react-redux';

import * as actions from '../actions/team_status_actions.js';

class TeamPicker extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  render() {
    return (
      <div className="ha-control-box">
        <button type="button" onClick={this.props.refresh}>
          Refresh Now
        </button>
        <select
          value={this.props.teamId}
          onChange={this.props.changeTeam}
        >
          {this.props.teamIds.map(teamId => (
            <option key={teamId} value={teamId}>{teamId}</option>
          ))}
        </select>
      </div>
    );
  }
}

class PuzzleRow extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  render() {
    const visibility = this.props.visibility;
    return (
      <tr>
        <td>{visibility.get('puzzleId')}</td>
        <td>{visibility.get('status')}</td>
      </tr>
    );
  }
}

class TeamStatus extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  render() {
    return (
      <div>
        <div className="ha-control-boxes-container">
          <TeamPicker
            teamId={this.props.teamId}
            teamIds={this.props.teamIds}
            refresh={this.props.refresh}
            changeTeam={this.props.changeTeam}
          />
        </div>
        <div className="ha-page-section">
          <table className="ha-table">
            <thead>
              <tr>
                <th>Puzzle</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {this.props.visibilities.map(visibility =>
                <PuzzleRow
                  key={visibility.get('puzzleId')}
                  visibility={visibility}
                />
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export const TeamStatusContainer = connect(
  state => ({
    teamIds: state.getIn(['common', 'teamIds']),
    teamId: state.getIn(['teamStatus', 'teamId']),
    visibilities: state.getIn(['teamStatus', 'visibilities']),
  }),
  {
    refresh: actions.fetchVisibilities,
    changeTeam: event => actions.changeTeam(event.target.value),
  })(TeamStatus);
