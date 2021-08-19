import { render, fireEvent } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';

import TransactionInputContainer from './TransactionInputContainer';

import mockInitState from '../../fixtures/mockInitState';
import mockDailyData from '../../fixtures/mockDailyData';
import mockExpenseTransaction from '../../fixtures/mockExpenseTransaction';

jest.mock('react-redux');

describe('TransactionInputContainer', () => {
  const dispatch = jest.fn();
  global.alert = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();
    global.alert.mockClear();

    useDispatch.mockImplementation(() => dispatch);

    useSelector.mockImplementation((selector) => selector({
      ...mockInitState,
    }));
  });

  it('listens changeBreakdownFields events', () => {
    const { getByPlaceholderText } = render(<TransactionInputContainer />);

    fireEvent.change(getByPlaceholderText('0'), {
      target: {
        value: '1000',
      },
    });

    expect(dispatch).toBeCalledWith({
      type: 'application/changeBreakdownFields',
      payload: { value: '1000' },
    });
  });

  it('listens change events', () => {
    const { getByLabelText } = render(<TransactionInputContainer />);

    const controls = [
      { label: '거래처', name: 'source', value: '카페' },
      { label: '메모', name: 'memo', value: '친구들이랑' },
    ];

    controls.forEach(({ label, name, value }) => {
      fireEvent.change(getByLabelText(label), { target: { value } });

      expect(dispatch).toBeCalledWith({
        type: 'application/changeTransactionFields',
        payload: { name, value },
      });
    });
  });

  describe('handleSubmit event', () => {
    context('does not exist targetId', () => {
      useSelector.mockImplementation((selector) => selector({
        ...mockInitState,
        targetId: null,
        monthlyTransaction: [
          {
            ...mockDailyData,
            transactionHistories: [
              {
                id: 100,
                ...mockExpenseTransaction,
              },
            ],
          },
        ],
      }));

      it('click without change feilds', () => {
        const { getByText } = render(<TransactionInputContainer />);

        fireEvent.click(getByText('저장'));

        expect(global.alert).toHaveBeenCalledTimes(1);
        expect(global.alert).toHaveBeenCalledWith('금액을 입력해주세요.');
      });

      it('click with breakdown and without category feilds', () => {
        useSelector.mockImplementation((selector) => selector({
          transaction: {
            type: '지출',
            category: '',
            transactionFields: {
              breakdown: 1000,
              source: '',
              memo: '',
            },
          },
        }));

        const { getByText } = render(<TransactionInputContainer />);

        fireEvent.click(getByText('저장'));

        expect(global.alert).toHaveBeenCalledTimes(1);
        expect(global.alert).toHaveBeenCalledWith('카테고리를 선택해주세요.');
      });

      it('click with breakdown and category and without source feilds', () => {
        useSelector.mockImplementation((selector) => selector({
          transaction: {
            type: '지출',
            category: '식비',
            transactionFields: {
              breakdown: 1000,
              source: '',
              memo: '',
            },
          },
        }));

        const { getByText } = render(<TransactionInputContainer />);

        fireEvent.click(getByText('저장'));

        expect(global.alert).toHaveBeenCalledTimes(1);
        expect(global.alert).toHaveBeenCalledWith('거래처를 입력헤주세요.');
      });

      it('click with breakdown, type, category and source feilds', () => {
        useSelector.mockImplementation((selector) => selector({
          transaction: {
            type: '지출',
            category: { value: '식비' },
            transactionFields: {
              breakdown: 1000,
              source: '마트',
              memo: '',
            },
          },
        }));

        const { getByText } = render(<TransactionInputContainer />);
        fireEvent.click(getByText('저장'));

        expect(dispatch).toBeCalledWith({
          type: 'application/setTransaction',
          payload: {
            transaction: {
              type: '지출',
              category: { value: '식비' },
              transactionFields: {
                breakdown: 1000,
                source: '마트',
                memo: '',
              },
            },
          },
        });

        expect(dispatch).toBeCalledWith({
          type: 'application/addMonthlyTransaction',
          payload: {
            transaction: {
              type: '지출',
              category: { value: '식비' },
              transactionFields: {
                breakdown: 1000,
                source: '마트',
                memo: '',
              },
            },
          },
        });
      });
    });

    context('does exist targetId and id equal targetId', () => {
      it('renders edit transaction', () => {
        useSelector.mockImplementation((selector) => selector({
          targetId: 1,
          monthlyTransaction: [
            {
              ...mockDailyData,
              transactionHistories: [
                {
                  id: 1,
                  ...mockExpenseTransaction,
                },
              ],
            },
          ],
          transaction: {
            type: '지출',
            category: { value: '식비' },
            transactionFields: {
              breakdown: 1000,
              source: '마트',
              memo: '장보기',
            },
          },
        }));

        const { getByText } = render(<TransactionInputContainer />);
        fireEvent.click(getByText('저장'));

        expect(dispatch).toBeCalledWith({
          type: 'application/deleteTransaction',
          payload: { id: 1 },
        });

        expect(dispatch).toBeCalledWith({
          type: 'application/setTransaction',
          payload: {
            transaction: {
              type: '지출',
              category: { value: '식비' },
              transactionFields: {
                breakdown: 1000,
                memo: '장보기',
                source: '마트',
              },
            },
          },
        });

        expect(dispatch).toBeCalledWith({
          type: 'application/addMonthlyTransaction',
          payload: {
            transaction: {
              type: '지출',
              category: { value: '식비' },
              transactionFields: {
                breakdown: 1000,
                memo: '장보기',
                source: '마트',
              },
            },
          },
        });
      });
    });
  });
});
