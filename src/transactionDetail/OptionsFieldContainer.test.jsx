import { render, fireEvent } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';

import OptionsFieldContainer from './OptionsFieldContainer';

jest.mock('react-redux');

describe('OptionsField', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();
    useDispatch.mockImplementation(() => dispatch);

    useSelector.mockImplementation((selector) => selector({
      selectedType: null,
    }));
  });

  it('renders options', () => {
    const { container } = render(<OptionsFieldContainer />);

    expect(container).toHaveTextContent('분류');
    expect(container).toHaveTextContent('카테고리');
  });

  it('renders type container', () => {
    const { container } = render(<OptionsFieldContainer />);

    expect(container).toHaveTextContent('지출');
    expect(container).toHaveTextContent('수입');
  });

  it('listens "지출" click event', () => {
    const { getByText } = render(<OptionsFieldContainer />);

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

  it('listens "수입" click event', () => {
    const { getByText } = render(<OptionsFieldContainer />);

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

  context('when selected "지출" type', () => {
    beforeEach(() => {
      useSelector.mockImplementation((selector) => selector({
        selectedType: '지출',
      }));
    });

    it('renders category', () => {
      const { queryByText } = render(<OptionsFieldContainer />);

      expect(queryByText('미분류')).not.toBeNull();
      expect(queryByText('식비')).not.toBeNull();
    });
  });

  context('when selected "수입" type', () => {
    beforeEach(() => {
      useSelector.mockImplementation((selector) => selector({
        selectedType: '수입',
      }));
    });

    it('renders category', () => {
      const { queryByText } = render(<OptionsFieldContainer />);

      expect(queryByText('미분류')).not.toBeNull();
      expect(queryByText('급여')).not.toBeNull();
    });
  });

  it('listen category change event', () => {
    const { getByTestId } = render(<OptionsFieldContainer />);

    fireEvent.change(getByTestId('select'));

    expect(dispatch).toBeCalled();
  });
});
