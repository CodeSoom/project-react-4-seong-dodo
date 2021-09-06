import { render } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';

import TransactionDetailModal from './TransactionDetailModal';

import mockInitState from '../../../fixtures/mockInitState';

jest.mock('react-redux');

describe('TransactionDetailModal', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();
    useDispatch.mockImplementation(() => dispatch);

    useSelector.mockImplementation((selector) => selector({
      user: {
        accessToken: 'ACCESS_TOKEN',
      },
      accountbook: {
        ...mockInitState,
      },
    }));
  });

  it('renders breakdown container', () => {
    const { queryByPlaceholderText } = render(<TransactionDetailModal />);

    expect(queryByPlaceholderText('0')).not.toBeNull();
  });

  it('renders type container', () => {
    const { container } = render(<TransactionDetailModal />);

    expect(container).toHaveTextContent('분류');
  });

  it('renders category container', () => {
    const { container } = render(<TransactionDetailModal />);

    expect(container).toHaveTextContent('카테고리');
  });

  it('renders input fields container', () => {
    const { container } = render(<TransactionDetailModal />);

    expect(container).toHaveTextContent('거래처');
    expect(container).toHaveTextContent('메모');
  });

  it('renders submit container', () => {
    useSelector.mockImplementation((selector) => selector({
      user: {
        accessToken: 'ACCESS_TOKEN',
      },
      accountbook: {
        ...mockInitState,
        transaction: {
          type: '수입',
          category: { value: '용돈' },
          transactionFields: {
            breakdown: '1000.0',
            source: '심부름',
            memo: '1회 성공',
          },
        },
      },
    }));

    const { container } = render(<TransactionDetailModal />);

    expect(container).toHaveTextContent('저장');
  });
});
