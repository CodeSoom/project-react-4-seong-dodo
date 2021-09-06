import { render, fireEvent } from '@testing-library/react';

import IncomeCategory from './IncomeCategory';

describe('IncomeCategory', () => {
  const handleChange = jest.fn();
  const transaction = {
    type: '수입',
    category: { value: '미분류' },
    transactionFields: {
      breakdown: '',
      source: '',
      memo: '',
    },
  };

  function renderIncomeCategory() {
    return render((
      <IncomeCategory
        transaction={transaction}
        onChange={handleChange}
      />
    ));
  }

  it('renders income category', () => {
    const { queryByText } = renderIncomeCategory();

    expect(queryByText('급여').value).not.toBeNull();
  });

  it('listens change events', () => {
    const { getByTestId } = renderIncomeCategory();

    fireEvent.change(getByTestId('select'), { value: '미분류' });

    expect(handleChange).toBeCalledWith({ value: '미분류' });
  });

  it('거래내역이 등록되어있을때, 거래내역 수정버튼을 클릭하면 등록된 거래내역의 카테고리가 선택된다', () => {
    // given
    const testTransaction = {
      type: '수입',
      category: { value: '용돈' },
      transactionFields: {
        breakdown: '',
        source: '',
        memo: '',
      },
    };
    // when
    const { queryByText } = render((
      <IncomeCategory
        transaction={testTransaction}
        onChange={handleChange}
      />
    ));
    // then
    expect(queryByText('용돈').value).not.toBeNull();
  });
});
