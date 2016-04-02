import React from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions/start_hunt_actions';

class StartHuntButton extends React.Component {
  render() {
    const buttonAttrs = {};
    if (this.props.started) {
      buttonAttrs.disabled = 'disabled';
    }

    return (
      <div className="floating-hunt-box-section">
        <button
          className="hunt-box-element"
          type="button"
          {...buttonAttrs}
          onClick={this.props.click}
        >
          Start Hunt
        </button>
      </div>
    );
  }
}

export const StartHuntButtonContainer = connect(
  state => ({
    started: state.getIn(['startHunt', 'started']),
  }),
  {
    click: actions.startHunt,
  })(StartHuntButton);
