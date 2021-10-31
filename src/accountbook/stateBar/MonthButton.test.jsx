import { render, fireEvent } from '@testing-library/react';

import MonthButton from './MonthButton';

describe('MonthButton', () => {
  const handleClick = jest.fn();

  function renderMonthButton({ direction = '' }) {
    return render((
      <MonthButton
        direction={direction}
        onClick={handleClick}
      />
    ));
  }

  it('renders "<" button', () => {
    const { getByText } = renderMonthButton({ direction: '<' });

    fireEvent.click(getByText('<'));

    expect(handleClick).toBeCalled();
  });

  it('renders "<" button', () => {
    const { getByText } = renderMonthButton({ direction: '>' });

    fireEvent.click(getByText('>'));

    expect(handleClick).toBeCalled();
  });
});
