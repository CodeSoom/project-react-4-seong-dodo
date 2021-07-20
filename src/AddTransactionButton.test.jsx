import { render, fireEvent } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';

import AddTransactionButton from './AddTransactionButton';

import mockInitState from '../fixtures/mockInitState';

jest.mock('react-redux');

describe('AddTransactionButton', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();
    useDispatch.mockImplementation(() => dispatch);

    useSelector.mockImplementation((selector) => selector({
      ...mockInitState,
    }));
  });

  it('listens click event', () => {
    const { getByText } = render(<AddTransactionButton />);

    const onClick = jest.fn();

    fireEvent.click(getByText('내역추가'));

    expect(onClick).not.toBeFalsy();
  });
});
