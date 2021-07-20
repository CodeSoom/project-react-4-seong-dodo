import { render, fireEvent } from '@testing-library/react';

import IncomeCategory from './IncomeCategory';

describe('IncomeCategory', () => {
  it('renders income category', () => {
    const handleChange = jest.fn();

    const { queryByText } = render((
      <IncomeCategory
        onChange={handleChange}
      />
    ));

    expect(queryByText('급여').value).not.toBeNull();
  });

  it('listens change events', () => {
    const handleChange = jest.fn();

    const { getByTestId } = render((
      <IncomeCategory
        onChange={handleChange}
      />
    ));

    fireEvent.change(getByTestId('select'), { value: '미분류' });

    expect(handleChange).toBeCalledWith({ value: '미분류' });
  });
});
