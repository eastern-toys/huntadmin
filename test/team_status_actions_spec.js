import { assert } from 'chai';
import { fromJS } from 'immutable';
import * as sinon from 'sinon';

import { mockStore, stubFetch } from './test_utils';

import * as actions from '../src/actions/team_status_actions';

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
      stubFetch(sandbox, {
        '/visibilities?teamId=team1': {
          visibilities,
        },
      });

      store.dispatch(actions.fetchVisibilities())
        .then(() => {
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

      stubFetch(sandbox, {});

      store.dispatch(actions.fetchVisibilities())
        .then(() => {
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
