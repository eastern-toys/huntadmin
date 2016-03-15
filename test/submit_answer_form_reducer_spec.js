import { assert } from 'chai';
import { List, Map } from 'immutable';

import reducer from '../src/reducers/submit_answer_form_reducer';

describe('submit answer form reducer', () => {
  it('handles SUBMIT_ANSWER_FORM_FETCH_TEAMS', () => {
    const teamIds = ['team1', 'team2'];

    const initialState = new Map();
    const action = {
      type: 'SUBMIT_ANSWER_FORM_FETCH_TEAMS',
      teamIds,
    };
    const nextState = reducer(initialState, action);

    assert.equal(nextState.get('teamIds'), new List(teamIds));
    assert.equal(nextState.get('teamId'), teamIds[0]);
  });
});
