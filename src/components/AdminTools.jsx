import React from 'react';
import shallowCompare from 'react-addons-shallow-compare';

import { AddTeamFormContainer } from './AddTeamForm';
import { AddUserFormContainer } from './AddUserForm';
import { EditUserFormContainer } from './EditUserForm';
import { EventButtonsContainer } from './EventButtons';
import { FullReleaseFormContainer } from './FullReleaseForm';
import { SubmitAnswerFormContainer } from './SubmitAnswerForm';

export class AdminTools extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  render() {
    return (
      <div className="ha-control-boxes-container">
        <SubmitAnswerFormContainer />
        <EventButtonsContainer />
        <FullReleaseFormContainer />
        <AddTeamFormContainer />
        <AddUserFormContainer />
        <EditUserFormContainer />
      </div>
    );
  }
}
