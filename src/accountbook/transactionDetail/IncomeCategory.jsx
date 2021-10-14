import styled from '@emotion/styled';
import colors from '../../style/colors';
import mediaquery from '../../style/mediaquery';

const Container = styled.div(mediaquery({
  margin: '0 auto',
  lineHeight: [1.5, 1.5, 2.5, '4em', '4em'],
  '& select': {
    width: ['60%', '60%', '60%', '70%', '70%'],
    padding: ['0.4em', '0.4em', '0.4em', '.8em', '.8em'],
    border: 'none',
    borderRadius: '1em',
    color: `${colors.gray_text03}`,
    fontSize: ['0.6em', '0.6em', '0.7em', '.8em', '.8em'],
    outlineStyle: 'none',
  },
  '& option': {
    padding: '0.6em',
    border: 'none',
    borderRadius: '2em',
    color: `${colors.gray_text02}`,
  },
}));

export default function IncomeCategory({ transaction, onChange }) {
  const incomeCategories = [
    '미분류',
    '급여', '용돈', '금융수입', '사업수입', '기타수입',
  ];

  function handleChange(event) {
    const { target } = event;
    onChange({ value: target.value });
  }

  function isSelectedCategory() {
    return incomeCategories.find((categoryName) => transaction.category.value === categoryName);
  }

  return (
    <Container>
      <select
        data-testid="select"
        name="income-category"
        onChange={handleChange}
        value={isSelectedCategory()}
      >
        {
          incomeCategories.map((category) => (
            <option
              key={category}
              value={category}
            >
              {category}
            </option>
          ))
        }
      </select>
    </Container>
  );
}
