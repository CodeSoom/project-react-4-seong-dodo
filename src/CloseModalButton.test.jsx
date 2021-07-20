import { render, fireEvent } from '@testing-library/react';

import CloseModalButton from './CloseModalButton';

test('CloseModalButton', () => {
  const onClick = jest.fn();

  const { getByText } = render((
    <CloseModalButton
      onClick={onClick}
    />
  ));

  fireEvent.click(getByText('X'));

  expect(onClick).not.toBeFalsy();
});
