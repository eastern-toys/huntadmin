import { assert } from 'chai';
import { fromJS } from 'immutable';
import configureMockStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';
import * as sinon from 'sinon';

import { stubFetchFailure, stubFetchSuccess } from './test_utils';

import * as actions from '../src/actions/team_status_actions';

const mockStore = configureMockStore([thunkMiddleware]);

describe('team status action creator', () => {
  let sandbox;
  beforeEach(() => {
    sandbox = sinon.sandbox.create();
  });
  afterEach(() => {
    sandbox.restore();
  });

  describe('for TEAM_STATUS_FETCH_VISIBILITIES', () => {
    it('dispatches action on successful fetch', done => {
      const store = mockStore(fromJS({
        teamStatus: {
          teamId: 'team1',
        },
      }));

      const visibilities = [
        { teamId: 'team1', puzzleId: 'puzzle1', status: 'UNLOCKED' },
      ];
      const fetchStub = stubFetchSuccess(sandbox, { visibilities });

      store.dispatch(actions.fetchVisibilities())
        .then(() => {
          assert.equal(
            fetchStub.args[0][0].url,
            `${CUBE_API_SERVER}/visibilities?teamId=team1`
          );
          assert.deepEqual(store.getActions(), [
            {
              type: 'TEAM_STATUS_FETCH_VISIBILITIES',
              visibilities,
            },
          ]);
          done();
        })
        .catch(done);
    });
    it('dispatches action on failed fetch', done => {
      const store = mockStore(fromJS({
        teamStatus: {
          teamId: 'team1',
        },
      }));

      const fetchStub = stubFetchFailure(sandbox, 400);

      store.dispatch(actions.fetchVisibilities())
        .then(() => {
          assert.equal(
            fetchStub.args[0][0].url,
            `${CUBE_API_SERVER}/visibilities?teamId=team1`
          );
          const storeActions = store.getActions();
          assert.lengthOf(storeActions, 1);
          assert.equal(storeActions[0].type, 'TEAM_STATUS_FETCH_VISIBILITIES');
          assert.isDefined(storeActions[0].error);
          done();
        })
        .catch(done);
    });
  });
});
