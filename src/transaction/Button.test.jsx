import { render, fireEvent } from '@testing-library/react';

import Button from './Button';

describe('Button', () => {
  const handleClick = jest.fn();

  function renderMonthButton({ value } = '') {
    return render((
      <Button
        value={value}
        onClick={handleClick}
      />
    ));
  }

  describe('when "내역추가" vaule', () => {
    it('renders button and listens click event', () => {
      const { getByText } = renderMonthButton({ value: '내역추가' });

      fireEvent.click(getByText('내역추가'));

      expect(handleClick).toBeCalled();
    });
  });
});
