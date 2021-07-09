import { render } from '@testing-library/react';

import MonthItem from './MonthItem';

describe('MonthItem', () => {
  it('renders year and month', () => {
    const year = 2021;
    const month = 7;

    const { container, queryByText } = render((
      <MonthItem
        year={year}
        month={month}
      />));

    expect(queryByText('2021')).not.toBeNull();

    expect(container).toHaveTextContent('7월');
  });
});
