import * as d3 from 'd3';
import * as _ from 'lodash';
import React from 'react';

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

class TimestampSeries extends React.Component {
  render() {
    const path = d3.svg.line()
      .x(d => this.props.timestampScale(d))
      .y((d, i) => this.props.eventsScale(i + 1))
      .interpolate('step-after');

    const textX = Number(
      this.props.timestampScale(_.last(this.props.timestamps))) + 2;
    const textY = Number(
      this.props.eventsScale(this.props.timestamps.length)) + 5;

    return (
      <g>
        <path
          d={path(this.props.timestamps)}
          stroke={this.props.color}
          fill="none"
        />
        <text
          className="ha-chart-text"
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

/**
 * Data should be provied in the following format:
 * [
 *   {
 *     label: 'team1',
 *     timestamps: [1, 2, 3],
 *   },
 *   {
 *     label: 'team2',
 *     timestamps: [1, 3, 4],
 *   },
 * ]
 */
export class TimestampedEventChart extends React.Component {
  componentDidMount() {
    this.renderAxes();
  }

  componentDidUpdate() {
    this.renderAxes();
  }

  makeTimestampScale() {
    const timestamps = _.flatten(
      _.map(this.props.data, _.property('timestamps')));
    const minTimestamp = _.min(timestamps);
    const maxTimestamp = _.max(timestamps);
    return d3.time.scale()
      .domain([minTimestamp, maxTimestamp])
      .nice(d3.time.hour)
      .range([
        this.props.axisSize,
        this.props.width - this.props.axisSize - this.props.paddingRight,
      ]);
  }

  makeEventsScale() {
    const maxEvents = _.max(
      _.map(this.props.data, series => series.timestamps.length));
    return d3.scale.linear()
      .domain([0, maxEvents])
      .range([this.props.height - this.props.axisSize, this.props.axisSize]);
  }

  renderAxes() {
    const timestampScale = this.makeTimestampScale();
    const xAxis = d3.svg.axis()
      .scale(timestampScale)
      .orient('bottom')
      .tickSize(4, 0);
    d3.select(this.refs.xAxis).call(xAxis);

    const eventsScale = this.makeEventsScale();
    const yAxis = d3.svg.axis()
      .scale(eventsScale)
      .orient('left')
      .tickSize(4, 0)
      .ticks(Math.min(10, eventsScale.domain()[1]));
    d3.select(this.refs.yAxis).call(yAxis);
  }

  render() {
    const timestampScale = this.makeTimestampScale();
    const eventsScale = this.makeEventsScale();

    const xAxisYTranslation = this.props.height - this.props.axisSize;
    const yAxisXTranslation = this.props.axisSize;

    return (
      <div className="ha-page-section ha-chart-container">
        <h3>{this.props.title}</h3>
        <svg width={this.props.width} height={this.props.height}>
          <g
            ref="xAxis"
            className="ha-chart-text"
            height={this.props.axisSize}
            transform={`translate(0, ${xAxisYTranslation})`}
          />
          <g
            ref="yAxis"
            className="ha-chart-text"
            width={this.props.axisSize}
            transform={`translate(${yAxisXTranslation}, 0)`}
          />
          {_.map(this.props.data, (series, i) => (
            <TimestampSeries
              key={series.label}
              timestampScale={timestampScale}
              eventsScale={eventsScale}
              label={series.label}
              timestamps={series.timestamps}
              color={COLORS[i % COLORS.length]}
            />
          ))}
        </svg>
      </div>
    );
  }
}
