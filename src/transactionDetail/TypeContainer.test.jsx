import { render, fireEvent } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';

import TypeContainer from './TypeContainer';

import mockInitState from '../../fixtures/mockInitState';

jest.mock('react-redux');

describe('TypeContainer', () => {
  const dispatch = jest.fn();
  global.alert = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();
    global.alert.mockClear();

    useDispatch.mockImplementation(() => dispatch);

    useSelector.mockImplementation((selector) => selector({
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
    }));
  });

  it('renders type container', () => {
    const { container } = render(<TypeContainer />);

    expect(container).toHaveTextContent('분류');
    expect(container).toHaveTextContent('지출');
    expect(container).toHaveTextContent('수입');
  });

  context('when selected "수입" button', () => {
    useSelector.mockImplementation((selector) => selector({
      ...mockInitState,
      selectedType: '수입',
      transaction: {
        type: '수입',
        category: { value: '미분류' },
        transactionFields: {
          breakdown: 0,
          source: '',
          memo: '',
        },
      },
    }));

    it('listens "지출" click event and changes selected "지출" button', () => {
      const { getByText } = render(<TypeContainer />);

      fireEvent.click(getByText('지출'));

      expect(dispatch).toBeCalledWith({
        type: 'application/selectType',
        payload: '지출',
      });

      expect(dispatch).toBeCalledWith({
        type: 'application/changeTransactionType',
        payload: '지출',
      });
    });
  });

  context('when selected "지출" button', () => {
    useSelector.mockImplementation((selector) => selector({
      ...mockInitState,
      selectedType: '지출',
      transaction: {
        type: '지출',
        category: { value: '미분류' },
        transactionFields: {
          breakdown: 0,
          source: '',
          memo: '',
        },
      },
    }));

    it('listens "수입" click event and changes selected "수입" button', () => {
      const { getByText } = render(<TypeContainer />);

      fireEvent.click(getByText('수입'));

      expect(dispatch).toBeCalledWith({
        type: 'application/selectType',
        payload: '수입',
      });

      expect(dispatch).toBeCalledWith({
        type: 'application/changeTransactionType',
        payload: '수입',
      });
    });
  });
});
