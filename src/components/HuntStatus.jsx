import * as d3 from 'd3';
import * as _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';

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

class SolveSeries extends React.Component {
  render() {
    const path = d3.svg.line()
      .x(d => this.props.timestampScale(d.timestamp))
      .y(d => this.props.solvesScale(d.solveCount))
      .interpolate('step-after');

    const data = this.props.data;
    const textX = Number(this.props.timestampScale(data[data.length - 1].timestamp)) + 2;
    const textY = Number(this.props.solvesScale(data[data.length - 1].solveCount)) + 5;

    return (
      <g>
        <path
          d={path(this.props.data)}
          stroke={this.props.color}
          fill="none"
        />
        <text
          className="chart-text"
          x={textX}
          y={textY}
          fill={this.props.color}
        >
          {this.props.label}
        </text>
      </g>
    );
  }
}

const COLORS = [
  'brown',
  'cadetblue',
  'chocolate',
  'cornflowerblue',
  'crimson',
  'darkgoldenrod',
  'darkgreen',
  'darkslateblue',
  'darkturquoise',
  'deeppink',
  'indianred',
];

class SolveChart extends React.Component {
  componentDidMount() {
    this.renderAxes();
  }

  componentDidUpdate() {
    this.renderAxes();
  }

  transformData(visibilityChanges) {
    const teamChanges = _.groupBy(visibilityChanges, 'teamId');
    const teamSolveCounts = _.map(teamChanges, (changes, teamId) => ({
      teamId,
      changes: _.map(changes, (change, i) => ({
        timestamp: change.timestamp,
        solveCount: i + 1,
      })),
    }));
    return teamSolveCounts;
  }

  makeTimestampScale(visibilityChanges) {
    const timestamps = _.map(visibilityChanges, _.property('timestamp'));
    const minTimestamp = _.min(timestamps);
    // Leave extra space at the right of the graph to ensure labels don't get
    // cut off.
    const maxTimestamp = _.max(timestamps) + 1000 * 60 * 60;
    return d3.time.scale()
      .domain([minTimestamp, maxTimestamp])
      .nice(d3.time.hour)
      .range([this.props.axisSize, this.props.width - this.props.axisSize]);
  }

  makeSolvesScale(data) {
    const maxSolves = _.max(_.map(data, teamSolves =>
      _.max(_.map(teamSolves.changes, _.property('solveCount')))));
    return d3.scale.linear()
      .domain([0, maxSolves])
      .range([this.props.height - this.props.axisSize, this.props.axisSize]);
  }

  renderAxes() {
    const visibilityChanges = this.props.visibilityChanges.toJS();
    const data = this.transformData(visibilityChanges);

    const timestampScale = this.makeTimestampScale(visibilityChanges);
    const xAxis = d3.svg.axis()
      .scale(timestampScale)
      .orient('bottom')
      .tickSize(1);
    d3.select(this.refs.xAxis).call(xAxis);

    const solvesScale = this.makeSolvesScale(data);
    const yAxis = d3.svg.axis()
      .scale(solvesScale)
      .orient('left')
      .tickSize(1)
      .ticks(Math.min(10, solvesScale.domain()[1]));
    d3.select(this.refs.yAxis).call(yAxis);
  }

  render() {
    const visibilityChanges = this.props.visibilityChanges.toJS();
    const data = this.transformData(visibilityChanges);
    const timestampScale = this.makeTimestampScale(visibilityChanges);
    const solvesScale = this.makeSolvesScale(data);

    const xAxisYTranslation = this.props.height - this.props.axisSize;
    const yAxisXTranslation = this.props.axisSize;

    return (
      <div className="chart-container">
        <svg width={this.props.width} height={this.props.height}>
          <g
            ref="xAxis"
            className="chart-text"
            height={this.props.axisSize}
            transform={`translate(0, ${xAxisYTranslation})`}
          />
          <g
            ref="yAxis"
            className="chart-text"
            width={this.props.axisSize}
            transform={`translate(${yAxisXTranslation}, 0)`}
          />
          {_.map(data, (teamChanges, i) => (
            <SolveSeries
              key={teamChanges.teamId}
              timestampScale={timestampScale}
              solvesScale={solvesScale}
              label={teamChanges.teamId}
              data={teamChanges.changes}
              color={COLORS[i % COLORS.length]}
            />
          ))}
        </svg>
      </div>
    );
  }
}

class HuntStatus extends React.Component {
  render() {
    const state = this.props.state;

    return (
      <div>
        <div className="hunt-box-row">
          <Refresher
            refresh={this.props.refresh}
          />
        </div>
        <SolveChart
          width="1000"
          height="500"
          axisSize="30"
          visibilityChanges={state.get('visibilityChanges')}
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
