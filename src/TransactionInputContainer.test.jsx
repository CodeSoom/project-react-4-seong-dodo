import { render, fireEvent } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';

import TransactionInputContainer from './TransactionInputContainer';

jest.mock('react-redux');

describe('TransactionInputContainer', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();
    useDispatch.mockImplementation(() => dispatch);

    useSelector.mockImplementation((selector) => selector({
      breakdown: '',
    }));
  });

  context('with breakdown', () => {
    it('listens change events', () => {
      const { getByLabelText } = render(<TransactionInputContainer />);

      fireEvent.change(getByLabelText('거래처'), {
        target: { value: '1000' },
      });

      expect(dispatch).toBeCalledWith({
        type: 'application/changeBreakdown',
        payload: { value: '1000' },
      });
    });
  });

  context('without breakdown', () => {
    it('renders nothiong', () => {
      const { getByLabelText } = render(<TransactionInputContainer />);

      fireEvent.change(getByLabelText('거래처'), { target: { value: '' } });

      expect(dispatch).not.toBeCalled();
    });
  });
});
