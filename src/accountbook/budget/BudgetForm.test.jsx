import { render, fireEvent } from '@testing-library/react';

import BudgetForm from './BudgetForm';

describe('BudgetForm', () => {
  const handleChange = jest.fn();

  function renderBudgetForm(budget) {
    return render(<BudgetForm
      budget={budget}
      onChange={handleChange}
    />);
  }

  it('renders budget setup fields', () => {
    const { queryByLabelText } = renderBudgetForm();

    expect(queryByLabelText('한 달 예산')).not.toBeNull();
  });

  it('listens change events', () => {
    const { getByLabelText } = renderBudgetForm();

    fireEvent.change(getByLabelText('한 달 예산'), {
      target: { value: '1000' },
    });

    expect(handleChange).toBeCalledWith({
      name: 'budget',
      value: '1000',
    });
  });
});
