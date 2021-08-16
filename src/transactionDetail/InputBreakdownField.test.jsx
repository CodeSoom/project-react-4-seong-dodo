import { render, fireEvent } from '@testing-library/react';

import InputBreakdownField from './InputBreakdownField';

describe('InputBreakdownField', () => {
  const onChangeBreakdown = jest.fn();

  function renderInputBreakdownField(label = '', value = 0) {
    return render((
      <InputBreakdownField
        label={label}
        placeholder="0"
        value={value}
        onChangeBreakdown={onChangeBreakdown}
      />
    ));
  }
  it('renders label text', () => {
    const { getByLabelText } = renderInputBreakdownField();

    expect(getByLabelText('').value).toBe('0');
  });

  it('listens change events', () => {
    const { getByPlaceholderText } = renderInputBreakdownField();

    fireEvent.change(getByPlaceholderText('0'), { target: { value: '1000' } });

    expect(onChangeBreakdown).toBeCalledWith({ value: '1000' });
  });
});
