import { render, fireEvent, getAllByText } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';

import OptionsField from './OptionsField';

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

  it('renders type container', () => {
    const { container } = render(<OptionsField />);

    expect(container).toHaveTextContent('분류');
    expect(container).toHaveTextContent('지출');
    expect(container).toHaveTextContent('수입');
  });

  it('listens "지출" click event', () => {
    const { getByText } = render(<OptionsField />);

    fireEvent.click(getByText('지출'));

    expect(dispatch).toBeCalledWith({
      type: 'application/selectType',
      payload: '지출',
    });
  });

  it('listens "수입" click event', () => {
    const { getByText } = render(<OptionsField />);

    fireEvent.click(getByText('수입'));

    expect(dispatch).toBeCalledWith({
      type: 'application/selectType',
      payload: '수입',
    });
  });

  it('renders category', () => {
    const { queryByText } = render(<OptionsField />);

    expect(queryByText('미분류')).not.toBeNull();
  });

  it('renders income category', () => {
    const { getByText, container } = render(<OptionsField />);

    fireEvent.click(getByText('수입'), {
      selectedType: '수입',
    });

    expect(dispatch).toBeCalled();

    expect(container).toHaveTextContent('급여');
  });
});
