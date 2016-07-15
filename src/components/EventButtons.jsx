import React from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import { connect } from 'react-redux';

import * as actions from '../actions/event_button_actions';

class EventButtons extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  render() {
    const startHuntButtonAttrs = {};
    if (this.props.huntStarted) {
      startHuntButtonAttrs.disabled = 'disabled';
    }

    return (
      <div className="ha-control-box">
        <button
          type="button"
          {...startHuntButtonAttrs}
          onClick={this.props.startHunt}
        >
          Start Hunt
        </button>
      </div>
    );
  }
}

export const EventButtonsContainer = connect(
  state => ({
    huntStarted: state.getIn(['huntState', 'huntStarted']),
  }),
  {
    startHunt: actions.startHunt,
  })(EventButtons);
