import { render } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';

import TransactionDetailModal from './TransactionDetailModal';

import mockInitState from '../../fixtures/mockInitState';

jest.mock('react-redux');

describe('TransactionDetailModal', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();
    useDispatch.mockImplementation(() => dispatch);

    useSelector.mockImplementation((selector) => selector({
      ...mockInitState,
    }));
  });

  it('renders transaction modal', () => {
    const { container } = render(
      <TransactionDetailModal />,
    );

    expect(container).toHaveTextContent('거래처');
    expect(container).toHaveTextContent('메모');
  });
});
