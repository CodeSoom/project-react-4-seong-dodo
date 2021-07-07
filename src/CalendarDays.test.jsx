import { render } from '@testing-library/react';

import CalendarDays from './CalendarDays';

jest.mock('react-redux');

describe('CalendarDays', () => {
  it('renders calendaer days', () => {
    const days = ['일', '월', '화', '수', '목', '금', '토'];

    const { queryByText } = render((
      <CalendarDays
        days={days}
      />
    ));

    expect(queryByText('월')).toHaveTextContent('월');
  });
});
