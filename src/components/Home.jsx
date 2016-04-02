import React from 'react';
import shallowCompare from 'react-addons-shallow-compare';

export class Home extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  render() {
    return (
      <div>
      </div>
    );
  }
}
