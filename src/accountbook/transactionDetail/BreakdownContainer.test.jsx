import { render, fireEvent } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';

import BreakdownContainer from './BreakdownContainer';

import mockInitState from '../../../fixtures/mockInitState';

jest.mock('react-redux');

describe('BreakdownContainer', () => {
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

  it('renders breakdown container', () => {
    const { queryByPlaceholderText, container } = render(<BreakdownContainer />);

    expect(queryByPlaceholderText('0')).not.toBeNull();
    expect(container).toHaveTextContent('원');
  });

  it('changes breakdown Field', () => {
    const { getByPlaceholderText } = render(<BreakdownContainer />);

    fireEvent.change(getByPlaceholderText('0'), {
      target: {
        value: '1000',
      },
    });

    expect(dispatch).toBeCalledWith({
      type: 'accountbook/changeBreakdownFields',
      payload: { value: '1000' },
    });
  });
});
