import { render } from '@testing-library/react';

import ExpenseCategory from './ExpenseCategory';

describe('ExpenseCategory', () => {
  it('renders expense category', () => {
    const { queryByText } = render(<ExpenseCategory />);

    expect(queryByText('식비').value).not.toBeNull();
  });
});
