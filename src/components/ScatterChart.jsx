import * as d3 from 'd3';
import * as _ from 'lodash';
import React from 'react';

class ScatterSeries extends React.Component {
  render() {
    return (
      <g>
        {_.map(this.props.data, (d, i) => {
          const r = d.size ? d.size : 2;

          let label = '';
          if (d.label) {
            label = (
              <text
                className="chart-text"
                x={this.props.xScale(d.x) + r}
                y={this.props.yScale(d.y)}
              >
                {d.label}
              </text>
            );
          }

          return (
            <g key={i}>
              <circle
                cx={this.props.xScale(d.x)}
                cy={this.props.yScale(d.y)}
                r={r}
              />
              {label}
            </g>
          );
        })}
      </g>
    );
  }
}

export class ScatterChart extends React.Component {
  componentDidMount() {
    this.renderAxes();
  }

  componentDidUpdate() {
    this.renderAxes();
  }

  makeXScale() {
    const values = _.map(this.props.data, _.property('x'));
    let maxValue = _.max(values);
    if (maxValue === undefined) {
      maxValue = 1;
    }
    return d3.scale.linear()
      .domain([0, maxValue])
      .range([
        this.props.axisSize,
        this.props.width - this.props.axisSize - this.props.paddingRight,
      ]);
  }

  makeYScale() {
    const values = _.map(this.props.data, _.property('y'));
    let maxValue = _.max(values);
    if (maxValue === undefined) {
      maxValue = 1;
    }
    return d3.scale.linear()
      .domain([0, maxValue])
      .range([this.props.height - this.props.axisSize, this.props.axisSize]);
  }

  renderAxes() {
    const xScale = this.makeXScale();
    const xAxis = d3.svg.axis()
      .scale(xScale)
      .orient('bottom')
      .tickSize(4, 0)
      .ticks(Math.min(20, xScale.domain()[1]));
    d3.select(this.refs.xAxis).call(xAxis);

    const yScale = this.makeYScale();
    const yAxis = d3.svg.axis()
      .scale(yScale)
      .orient('left')
      .tickSize(4, 0)
      .ticks(Math.min(10, yScale.domain()[1]));
    d3.select(this.refs.yAxis).call(yAxis);
  }

  render() {
    const xScale = this.makeXScale();
    const yScale = this.makeYScale();

    const xAxisYTranslation = this.props.height - this.props.axisSize;
    const yAxisXTranslation = this.props.axisSize;

    const xAxisLabelX = xScale(xScale.domain()[1] / 2);
    const yAxisLabelY = yScale(yScale.domain()[1] / 2);

    return (
      <div className="chart-container">
        <h3>{this.props.title}</h3>
        <svg width={this.props.width} height={this.props.height}>
          <g
            ref="xAxis"
            className="chart-text"
            height={this.props.axisSize}
            transform={`translate(0, ${xAxisYTranslation})`}
          />
          <text
            className="chart-text"
            textAnchor="middle"
            x={xAxisLabelX}
            y={this.props.height - 1}
          >
            {this.props.xAxisLabel}
          </text>
          <g
            ref="yAxis"
            className="chart-text"
            width={this.props.axisSize}
            transform={`translate(${yAxisXTranslation}, 0)`}
          />
          <text
            className="chart-text"
            textAnchor="middle"
            transform={`rotate(-90) translate(-${yAxisLabelY},10)`}
          >
            {this.props.yAxisLabel}
          </text>
          <ScatterSeries
            xScale={xScale}
            yScale={yScale}
            data={this.props.data}
          />
        </svg>
      </div>
    );
  }
}
