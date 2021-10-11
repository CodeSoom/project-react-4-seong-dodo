import thunk from 'redux-thunk';

import configureStore from 'redux-mock-store';

import {
  loadDailyTransaction,
  setDailyTransaction,
  loadMonthlyTransaction,
  setMonthlyTransaction,
  sendTransaction,
  clearTransactionFields,
  sendEditTransaction,
} from '../accountbook';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

jest.mock('../../services/api');

describe('account actions', () => {
  let store;

  describe('loadDailyTransaction', () => {
    beforeEach(() => {
      store = mockStore({});
    });

    it('dispatchs setDailyTransaction', async () => {
      await store.dispatch(loadDailyTransaction({
        accessToken: 'ACCESS_TOKEN',
        year: 2021,
        month: 7,
        date: 1,
      }));

      const actions = store.getActions();

      expect(actions[0]).toEqual(setDailyTransaction({ dailyTransaction: {} }));
    });
  });

  describe('loadMonthlyTransaction', () => {
    beforeEach(() => {
      store = mockStore({});
    });

    it('dispatchs setMonthlyTransaction', async () => {
      await store.dispatch(loadMonthlyTransaction({
        accessToken: 'ACCESS_TOKEN',
        year: 2021,
        month: 7,
        date: 1,
      }));

      const actions = store.getActions();

      expect(actions[0]).toEqual(setMonthlyTransaction({ monthlyTransaction: {} }));
    });
  });

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

  describe('sendEditTransaction', () => {
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
      await store.dispatch(sendEditTransaction({ id: 1 }));

      const actions = store.getActions();

      expect(actions[0]).toEqual(clearTransactionFields());
    });
  });

  describe('sendDeleteTransaction', () => {
    // Todo: ...
  });
});
