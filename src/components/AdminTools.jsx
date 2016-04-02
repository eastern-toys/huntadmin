import React from 'react';
import shallowCompare from 'react-addons-shallow-compare';

import { FullReleaseFormContainer } from './FullReleaseForm';
import { StartHuntButtonContainer } from './StartHuntButton';
import { SubmitAnswerFormContainer } from './SubmitAnswerForm';

export class AdminTools extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  render() {
    return (
      <div>
        <SubmitAnswerFormContainer />
        <StartHuntButtonContainer />
        <FullReleaseFormContainer />
      </div>
    );
  }
}
