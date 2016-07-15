import { assert } from 'chai';
import { fromJS } from 'immutable';
import * as sinon from 'sinon';

import { mockStore, stubFetch } from './test_utils';

import * as actions from '../src/actions/login_actions';
import { PERMISSIONS } from '../src/util/user';

describe('login action creator', () => {
  let sandbox;
  beforeEach(() => {
    sandbox = sinon.sandbox.create();
  });
  afterEach(() => {
    sandbox.restore();
  });

  describe('login flow', () => {
    it('dispatches action on successful login', done => {
      const store = mockStore(fromJS({
        auth: {
          username: 'admin',
          password: 'adminpassword',
        },
      }));
      const router = [];

      const fetches = {
        '/users/admin': {
          username: 'admin',
        },
      };
      PERMISSIONS.forEach(permission => {
        fetches[`/authorized?permission=${permission}`] = {
          authorized: true,
        };
      });
      stubFetch(sandbox, fetches);

      store.dispatch(actions.login(router))
        .then(() => {
          assert.includeDeepMembers(store.getActions(), [
            {
              type: 'AUTH_LOGIN',
            },
            {
              type: 'AUTH_LOGIN_DONE',
              user: {
                username: 'admin',
              },
              permissions: PERMISSIONS,
            },
          ]);
          assert.deepEqual(router, ['/']);
          done();
        })
        .catch(done);
    });
    it('dispatches action on failed login', done => {
      const store = mockStore(fromJS({
        auth: {
          username: 'admin',
          password: 'adminpassword',
        },
      }));
      const router = [];

      stubFetch(sandbox, {
        '/users/admin': {
          code: 401,
          description: 'Unauthorized',
        },
      });

      store.dispatch(actions.login(router))
        .then(() => {
          assert.includeDeepMembers(store.getActions(), [
            {
              type: 'AUTH_LOGIN',
            },
            {
              type: 'AUTH_LOGIN_DONE',
              error: {
                statusCode: 401,
                statusText: 'Unauthorized',
                description: 'Unauthorized',
              },
            },
          ]);
          assert.deepEqual(router, []);
          done();
        })
        .catch(done);
    });
  });
});
