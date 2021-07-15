import { render, fireEvent } from '@testing-library/react';

import InputField from './InputField';

describe('InputField', () => {
  it('renders value', () => {
    const name = 'breakdown';
    const value = '500';

    const handleChange = jest.fn();

    const { getByLabelText } = render((
      <InputField
        label="거래처명"
        name={name}
        value={value}
        onChange={handleChange}
      />
    ));

    expect(getByLabelText('거래처명').value).toBe(value);
  });

  it('listens change events', () => {
    const name = 'breakdown';
    const value = '500';

    const handleChange = jest.fn();

    const { getByLabelText } = render((
      <InputField
        label="거래처명"
        name={name}
        onChange={handleChange}
      />
    ));

    fireEvent.change(getByLabelText('거래처명'), { target: { value } });

    expect(handleChange).toBeCalledWith({ name, value });
  });
});
