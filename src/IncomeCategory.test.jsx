import { render } from '@testing-library/react';

import IncomeCategory from './IncomeCategory';

describe('IncomeCategory', () => {
  it('renders income category', () => {
    const { queryByText } = render(<IncomeCategory />);

    expect(queryByText('급여').value).not.toBeNull();
  });
});
