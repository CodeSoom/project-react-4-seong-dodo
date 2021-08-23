import { render, fireEvent } from '@testing-library/react';

import IncomeCategory from './IncomeCategory';

describe('IncomeCategory', () => {
  const handleChange = jest.fn();
  const transaction = {
    type: '수입',
    category: { value: '미분류' },
    transactionFields: {
      breakdown: 0,
      source: '',
      memo: '',
    },
  };

  function renderIncomeCategory() {
    return render((
      <IncomeCategory
        transaction={transaction}
        onChange={handleChange}
      />
    ));
  }

  it('renders income category', () => {
    const { queryByText } = renderIncomeCategory();

    expect(queryByText('급여').value).not.toBeNull();
  });

  it('listens change events', () => {
    const { getByTestId } = renderIncomeCategory();

    fireEvent.change(getByTestId('select'), { value: '미분류' });

    expect(handleChange).toBeCalledWith({ value: '미분류' });
  });
});
