import { render, fireEvent } from '@testing-library/react';

import AddTransactionButton from './AddTransactionButton';

test('AddTransactionButton', () => {
  const { getByText } = render(<AddTransactionButton />);

  const onClick = jest.fn();

  fireEvent.click(getByText('내역추가'));

  expect(onClick).not.toBeFalsy();
});
