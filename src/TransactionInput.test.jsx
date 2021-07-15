import { render, fireEvent } from '@testing-library/react';

import TransactionInput from './TransactionInput';

describe('TransactionInput', () => {
  const handleChange = jest.fn();

  beforeEach(() => {
    handleChange.mockClear();
  });

  function renderTransactionInput({ breakdown, source, memo } = {}) {
    return render((
      <TransactionInput
        fields={{ breakdown, source, memo }}
        onChange={handleChange}
      />
    ));
  }

  it('renders transaction input fields', () => {
    const { queryByLabelText } = renderTransactionInput();

    expect(queryByLabelText('거래처명')).not.toBeNull();
    expect(queryByLabelText('거래처')).not.toBeNull();
    expect(queryByLabelText('메모')).not.toBeNull();
  });

  it('renders values of fields', () => {
    const { queryByLabelText } = renderTransactionInput({
      breakdown: '3000',
      source: '카페',
      memo: '친구들이랑',
    });

    expect(queryByLabelText('거래처명').value).toBe('3000');
    expect(queryByLabelText('거래처').value).toBe('카페');
    expect(queryByLabelText('메모').value).toBe('친구들이랑');
  });

  it('listens change events', () => {
    const { getByLabelText } = renderTransactionInput();

    const controls = [
      { label: '거래처명', name: 'breakdown', value: '5000' },
      { label: '거래처', name: 'source', value: '카페' },
      { label: '메모', name: 'memo', value: '친구들이랑' },
    ];

    controls.forEach(({ label, name, value }) => {
      fireEvent.change(getByLabelText(label), { target: { value } });

      expect(handleChange).toBeCalledWith({ name, value });
    });
  });
});
