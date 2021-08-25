import { render, fireEvent } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';

import InputFieldsContainer from './InputFieldsContainer';

import mockInitState from '../../fixtures/mockInitState';

jest.mock('react-redux');

describe('InputFieldsContainer', () => {
  const dispatch = jest.fn();
  global.alert = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();
    global.alert.mockClear();

    useDispatch.mockImplementation(() => dispatch);

    useSelector.mockImplementation((selector) => selector({
      ...mockInitState,
    }));
  });

  it('renders input fields container', () => {
    const { container, queryByPlaceholderText } = render(<InputFieldsContainer />);

    expect(container).toHaveTextContent('거래처');
    expect(queryByPlaceholderText('거래처명을 입력하세요.')).not.toBeNull();

    expect(container).toHaveTextContent('메모');
    expect(queryByPlaceholderText('메모를 입력하세요.')).not.toBeNull();
  });

  it('listens change events', () => {
    const { getByLabelText } = render(<InputFieldsContainer />);

    const controls = [
      { label: '거래처', name: 'source', value: '카페' },
      { label: '메모', name: 'memo', value: '친구들이랑' },
    ];

    controls.forEach(({ label, name, value }) => {
      fireEvent.change(getByLabelText(label), { target: { value } });

      expect(dispatch).toBeCalledWith({
        type: 'application/changeTransactionFields',
        payload: { name, value },
      });
    });
  });
});
