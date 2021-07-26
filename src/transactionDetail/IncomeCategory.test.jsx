import { render, fireEvent } from '@testing-library/react';

import IncomeCategory from './IncomeCategory';

describe('IncomeCategory', () => {
  const handleChange = jest.fn();

  function renderIncomeCategory() {
    return render((
      <IncomeCategory
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
