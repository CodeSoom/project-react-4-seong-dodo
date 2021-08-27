import { render, fireEvent } from '@testing-library/react';

import BreakdownField from './BreakdownField';

describe('BreakdownField', () => {
  const handleChange = jest.fn();

  function renderBreakdownField(label = '', value = 0) {
    return render((
      <BreakdownField
        label={label}
        placeholder="0"
        value={value}
        onChange={handleChange}
      />
    ));
  }

  it('renders label text', () => {
    const { getByLabelText } = renderBreakdownField();

    expect(getByLabelText('').value).toBe('0');
  });

  it('listens change events', () => {
    const { getByPlaceholderText } = renderBreakdownField();

    fireEvent.change(getByPlaceholderText('0'), { target: { value: '1000' } });

    expect(handleChange).toBeCalledWith({ value: '1000' });
  });
});
