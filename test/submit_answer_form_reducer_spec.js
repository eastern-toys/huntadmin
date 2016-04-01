import { assert } from 'chai';
import { Map } from 'immutable';

import reducer from '../src/reducers/submit_answer_form_reducer';

describe('submit answer form reducer', () => {
  it('handles SUBMIT_ANSWER_FORM_CHANGE_TEAM', () => {
    const initialState = new Map();
    const action = {
      type: 'SUBMIT_ANSWER_FORM_CHANGE_TEAM',
      teamId: 'myteam',
    };
    const nextState = reducer(initialState, action);

    assert.equal(nextState.get('teamId'), 'myteam');
  });
});
