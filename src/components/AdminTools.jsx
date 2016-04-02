import React from 'react';

import { FullReleaseFormContainer } from './FullReleaseForm';
import { StartHuntButtonContainer } from './StartHuntButton';
import { SubmitAnswerFormContainer } from './SubmitAnswerForm';

export class AdminTools extends React.Component {
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
