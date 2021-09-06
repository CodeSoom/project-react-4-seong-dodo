import { render, fireEvent } from '@testing-library/react';

import ExpenseCategory from './ExpenseCategory';

describe('ExpenseCategory', () => {
  const handleChange = jest.fn();
  const transaction = {
    type: '지출',
    category: { value: '미분류' },
    transactionFields: {
      breakdown: '',
      source: '',
      memo: '',
    },
  };

  function renderExpenseCategory() {
    return render((
      <ExpenseCategory
        transaction={transaction}
        onChange={handleChange}
      />
    ));
  }

  it('renders expense category', () => {
    const { queryByText } = renderExpenseCategory();

    expect(queryByText('식비').value).not.toBeNull();
  });

  it('listens change events', () => {
    const { getByTestId } = renderExpenseCategory();

    fireEvent.change(getByTestId('select'), { value: '미분류' });

    expect(handleChange).toBeCalledWith({ value: '미분류' });
  });

  it('거래내역이 등록되어있을때, 거래내역 수정버튼을 클릭하면 등록된 거래내역의 카테고리가 선택된다', () => {
    // given
    const testTransaction = {
      type: '지출',
      category: { value: '카페/간식' },
      transactionFields: {
        breakdown: '',
        source: '',
        memo: '',
      },
    };
    // when
    const { queryByText } = render((
      <ExpenseCategory
        transaction={testTransaction}
        onChange={handleChange}
      />
    ));
    // then
    expect(queryByText('카페/간식').value).not.toBeNull();
  });
});
