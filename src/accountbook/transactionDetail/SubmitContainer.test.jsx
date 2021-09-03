import { render, fireEvent } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';

import SubmitContainer from './SubmitContainer';

import mockInitState from '../../../fixtures/mockInitState';
import mockDailyData from '../../../fixtures/mockDailyData';
import mockExpenseTransaction from '../../../fixtures/mockExpenseTransaction';

jest.mock('react-redux');

describe('SubmitContainer', () => {
  const dispatch = jest.fn();
  global.alert = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();
    global.alert.mockClear();

    useDispatch.mockImplementation(() => dispatch);

    useSelector.mockImplementation((selector) => selector({
      accountbook: {
        ...mockInitState,
      },
    }));
  });

  it('rnders submit container', () => {
    const { container } = render(<SubmitContainer />);

    expect(container).toHaveTextContent(('저장'));
  });

  describe('listens click event', () => {
    useSelector.mockImplementation((selector) => selector({
      accountbook: {
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
      },
    }));

    it('click without change feilds', () => {
      const { getByText } = render(<SubmitContainer />);

      fireEvent.click(getByText('저장'));

      expect(global.alert).toHaveBeenCalledTimes(1);
      expect(global.alert).toHaveBeenCalledWith('금액을 입력해주세요.');
    });

    it('click with breakdown and without category feilds', () => {
      useSelector.mockImplementation((selector) => selector({
        accountbook: {
          transaction: {
            type: '지출',
            category: '',
            transactionFields: {
              breakdown: '1,000',
              source: '',
              memo: '',
            },
          },
        },
      }));

      const { getByText } = render(<SubmitContainer />);

      fireEvent.click(getByText('저장'));

      expect(global.alert).toHaveBeenCalledTimes(1);
      expect(global.alert).toHaveBeenCalledWith('카테고리를 선택해주세요.');
    });

    it('click with breakdown and category and without source feilds', () => {
      useSelector.mockImplementation((selector) => selector({
        accountbook: {
          transaction: {
            type: '지출',
            category: '식비',
            transactionFields: {
              breakdown: '1,000',
              source: '',
              memo: '',
            },
          },
        },
      }));

      const { getByText } = render(<SubmitContainer />);

      fireEvent.click(getByText('저장'));

      expect(global.alert).toHaveBeenCalledTimes(1);
      expect(global.alert).toHaveBeenCalledWith('거래처를 입력헤주세요.');
    });

    context('does not exist targetId', () => {
      it('click with breakdown, type, category and source feilds', () => {
        useSelector.mockImplementation((selector) => selector({
          accountbook: {
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
            transaction: {
              type: '지출',
              category: { value: '식비' },
              transactionFields: {
                breakdown: '1,000',
                source: '마트',
                memo: '',
              },
            },
          },
        }));

        const { getByText } = render(<SubmitContainer />);
        fireEvent.click(getByText('저장'));

        expect(dispatch).toBeCalledWith({
          type: 'accountbook/setTransaction',
          payload: {
            transaction: {
              type: '지출',
              category: { value: '식비' },
              transactionFields: {
                breakdown: '1,000',
                source: '마트',
                memo: '',
              },
            },
          },
        });

        expect(dispatch).toBeCalledWith({
          type: 'accountbook/addMonthlyTransaction',
          payload: {
            transaction: {
              type: '지출',
              category: { value: '식비' },
              transactionFields: {
                breakdown: '1,000',
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
          accountbook: {
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
                breakdown: '1,000',
                source: '마트',
                memo: '장보기',
              },
            },
          },
        }));

        const { getByText } = render(<SubmitContainer />);
        fireEvent.click(getByText('저장'));

        expect(dispatch).toBeCalledWith({
          type: 'accountbook/deleteTransaction',
          payload: { id: 1 },
        });

        expect(dispatch).toBeCalledWith({
          type: 'accountbook/setTransaction',
          payload: {
            transaction: {
              type: '지출',
              category: { value: '식비' },
              transactionFields: {
                breakdown: '1,000',
                memo: '장보기',
                source: '마트',
              },
            },
          },
        });

        expect(dispatch).toBeCalledWith({
          type: 'accountbook/addMonthlyTransaction',
          payload: {
            transaction: {
              type: '지출',
              category: { value: '식비' },
              transactionFields: {
                breakdown: '1,000',
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
