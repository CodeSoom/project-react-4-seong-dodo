import { render, fireEvent } from '@testing-library/react';

import TransactionInput from './TransactionInput';

describe('TransactionInput', () => {
  const handleChange = jest.fn();

  function renderTransactionInput(breakdown) {
    return render(<TransactionInput
      breakdown={breakdown}
      onChange={handleChange}
    />);
  }

  it('renders breakdown setup fields', () => {
    const { queryByLabelText } = renderTransactionInput();

    expect(queryByLabelText('거래처')).not.toBeNull();
  });

  it('listens change events', () => {
    const { getByLabelText } = renderTransactionInput();

    fireEvent.change(getByLabelText('거래처'), {
      target: { value: '1000' },
    });

    expect(handleChange).toBeCalledWith({
      name: 'breakdown',
      value: '1000',
    });
  });
});
