import { render, fireEvent } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';

import CategoryContainer from './CategoryContainer';

import mockInitState from '../../../fixtures/mockInitState';

jest.mock('react-redux');

describe('CategoryContainer', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();
    useDispatch.mockImplementation(() => dispatch);

    useSelector.mockImplementation((selector) => selector({
      accountbook: {
        ...mockInitState,
        selectedType: null,
        transaction: {
          type: '지출',
          category: { value: '미분류' },
          transactionFields: {
            breakdown: 0,
            source: '',
            memo: '',
          },
        },
      },
    }));
  });

  it('renders category container', () => {
    const { container } = render(<CategoryContainer />);

    expect(container).toHaveTextContent('카테고리');
    expect(container).toHaveTextContent('미분류');
  });

  context('when selected "지출" type', () => {
    beforeEach(() => {
      useSelector.mockImplementation((selector) => selector({
        accountbook: {
          ...mockInitState,
          selectedType: '지출',
        },
      }));
    });

    it('renders category', () => {
      const { queryByText } = render(<CategoryContainer />);

      expect(queryByText('미분류')).not.toBeNull();
      expect(queryByText('식비')).not.toBeNull();
    });
  });

  context('when selected "수입" type', () => {
    beforeEach(() => {
      useSelector.mockImplementation((selector) => selector({
        accountbook: {
          ...mockInitState,
          selectedType: '수입',
        },
      }));
    });

    it('renders category', () => {
      const { queryByText } = render(<CategoryContainer />);

      expect(queryByText('미분류')).not.toBeNull();
      expect(queryByText('급여')).not.toBeNull();
    });
  });

  it('listen category change event', () => {
    const { getByTestId } = render(<CategoryContainer />);

    fireEvent.change(getByTestId('select'));

    expect(dispatch).toBeCalled();
  });
});
