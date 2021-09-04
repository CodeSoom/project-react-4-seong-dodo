import thunk from 'redux-thunk';

import configureStore from 'redux-mock-store';

import {
  sendTransaction,
  clearTransactionFields,
} from '../accountbook';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

jest.mock('../../services/api');

describe('account actions', () => {
  let store;

  describe('sendTransaction', () => {
    beforeEach(() => {
      store = mockStore({
        user: {
          accessToken: '',
        },
        accountbook: {
          dailyData: {
            year: 2021,
            month: 7,
            date: 1,
          },
          transaction: {
            type: '',
            category: { value: '' },
            transactionFields: {
              breakdown: '',
              source: '',
              memo: '',
            },
          },
        },
      });
    });

    it('dispatchs clearTransactionFields', async () => {
      await store.dispatch(sendTransaction());

      const actions = store.getActions();

      expect(actions[0]).toEqual(clearTransactionFields());
    });
  });
});
