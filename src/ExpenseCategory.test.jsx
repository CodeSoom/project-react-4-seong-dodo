import { render, fireEvent } from '@testing-library/react';

import ExpenseCategory from './ExpenseCategory';

describe('ExpenseCategory', () => {
  const handleChange = jest.fn();

  it('renders expense category', () => {
    const { queryByText } = render((
      <ExpenseCategory
        onChange={handleChange}
      />
    ));

    expect(queryByText('식비').value).not.toBeNull();
  });

  it('listens change events', () => {
    const { getByTestId } = render((
      <ExpenseCategory
        onChange={handleChange}
      />
    ));

    fireEvent.change(getByTestId('select'), { value: '미분류' });

    expect(handleChange).toBeCalledWith({ value: '미분류' });
  });
});
