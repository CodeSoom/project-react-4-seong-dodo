import { render, fireEvent } from '@testing-library/react';

import ExpenseCategory from './ExpenseCategory';

describe('ExpenseCategory', () => {
  it('renders expense category', () => {
    const handleChange = jest.fn();

    const { queryByText } = render((
      <ExpenseCategory
        onChange={handleChange}
      />
    ));

    expect(queryByText('식비').value).not.toBeNull();
  });

  it('listens change events', () => {
    const handleChange = jest.fn();

    const { getByTestId } = render((
      <ExpenseCategory
        onChange={handleChange}
      />
    ));

    fireEvent.change(getByTestId('select'), { value: '미분류' });

    expect(handleChange).toBeCalledWith({ value: '미분류' });
  });
});
