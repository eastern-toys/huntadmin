import React from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions/team_status_actions.js';

class TeamPicker extends React.Component {
  render() {
    return (
      <div className="hunt-box-section">
        <button className="hunt-box-element" type="button" onClick={this.props.refresh}>
          Refresh Now
        </button>
        <select
          className="hunt-box-element"
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
  render() {
    return (
      <div>
        <div className="hunt-box-row">
          <TeamPicker
            teamId={this.props.teamId}
            teamIds={this.props.teamIds}
            refresh={this.props.refresh}
            changeTeam={this.props.changeTeam}
          />
        </div>
        <table className="hunt-table">
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
