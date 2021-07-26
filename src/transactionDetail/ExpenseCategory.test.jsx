import { render, fireEvent } from '@testing-library/react';

import ExpenseCategory from './ExpenseCategory';

describe('ExpenseCategory', () => {
  const handleChange = jest.fn();

  function renderExpenseCategory() {
    return render((
      <ExpenseCategory
        onChange={handleChange}
      />
    ));
  }

  it('renders expense category', () => {
    const { queryByText } = renderExpenseCategory();

    expect(queryByText('식비').value).not.toBeNull();
  });

  it('listens change events', () => {
    const { getByTestId } = renderExpenseCategory();

    fireEvent.change(getByTestId('select'), { value: '미분류' });

    expect(handleChange).toBeCalledWith({ value: '미분류' });
  });
});
