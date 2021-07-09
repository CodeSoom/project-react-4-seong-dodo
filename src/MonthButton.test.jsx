import { render, fireEvent } from '@testing-library/react';

import MonthButton from './MonthButton';

describe('MonthButton', () => {
  const handleClick = jest.fn();

  it('renders "<" button', () => {
    const { getByText } = render((
      <MonthButton
        direction="&lt;"
        onclick={handleClick}
      />));

    fireEvent.click(getByText('<'));

    expect(handleClick).toBeCalled();
  });

  it('renders "<" button', () => {
    const { getByText } = render((
      <MonthButton
        direction="&gt;"
        onclick={handleClick}
      />));

    fireEvent.click(getByText('>'));

    expect(handleClick).toBeCalled();
  });
});
