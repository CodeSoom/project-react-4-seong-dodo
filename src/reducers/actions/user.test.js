import thunk from 'redux-thunk';

import configureStore from 'redux-mock-store';

import {
  setAccessToken,
  requestLogin,
} from '../user';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

jest.mock('../../services/api');

describe('user actions', () => {
  let store;

  describe('requestLogin', () => {
    beforeEach(() => {
      store = mockStore({
        user: {
          loginFields: { email: '', password: '' },
        },
      });
    });

    it('dispatchs setAccessToken', async () => {
      await store.dispatch(requestLogin());

      const actions = store.getActions();

      expect(actions[0]).toEqual(setAccessToken({}));
    });
  });
});
