import { render, fireEvent } from '@testing-library/react';

import Button from './Button';

describe('Button', () => {
  const handleClick = jest.fn();

  function renderButton({ id = '', name = '' }) {
    return render((
      <Button
        id={id}
        name={name}
        onClick={handleClick}
      />
    ));
  }

  context('without id, name', () => {
    const id = '';
    const name = '';

    it('renders button name', () => {
      const { queryByText } = renderButton({ id, name });

      expect(queryByText('수입')).toBeNull();
    });
  });

  context('with id, name', () => {
    const id = 'income';
    const name = '수입';

    it('renders button name', () => {
      const { queryByText } = renderButton({ id, name });

      expect(queryByText('수입')).not.toBeNull();
    });

    it('listens click event', () => {
      const { getByText } = renderButton({ name: '수입' });

      fireEvent.click(getByText('수입'));

      expect(handleClick).toBeCalled();
    });
  });
});
