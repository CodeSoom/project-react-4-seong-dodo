import { render, fireEvent } from '@testing-library/react';

import InputField from './InputField';

describe('InputField', () => {
  it('renders value', () => {
    const name = 'memo';
    const value = '친구들이랑';

    const handleChange = jest.fn();

    const { getByLabelText } = render((
      <InputField
        label="메모"
        name={name}
        value={value}
        onChange={handleChange}
      />
    ));

    expect(getByLabelText('메모').value).toBe(value);
  });

  it('listens change events', () => {
    const name = 'memo';
    const value = '친구들이랑';

    const handleChange = jest.fn();

    const { getByLabelText } = render((
      <InputField
        label="메모"
        name={name}
        onChange={handleChange}
      />
    ));

    fireEvent.change(getByLabelText('메모'), { target: { value } });

    expect(handleChange).toBeCalledWith({ name, value });
  });
});
