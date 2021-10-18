import styled from '@emotion/styled';
import colors from '../../style/colors';
import mediaquery from '../../style/mediaquery';

const Container = styled.div(mediaquery({
  margin: '0 auto',
  lineHeight: 1.5,
  '& select': {
    width: ['15em', '16em', '17em', '22em', '15em', '19em'],
    height: ['2em', '1.9em', '1.9em', '1.6em', '2.9em', '2.7em'],
    margin: '0.3em auto',
    padding: [
      '0.2em 0.5em',
      '0.2em 0.5em',
      '0.2em 0.5em',
      '0.2em 0.5em',
      '0.2em 1em',
      '0.2em 1em',
    ],
    border: 'none',
    borderRadius: ['0.7em', '1em', '1em', '1em', '1em', '0.7em'],
    color: `${colors.gray_text03}`,
    fontSize: ['0.6em', '0.6em', '0.7em', '1em', '0.9em', '0.9em'],
    outlineStyle: 'none',
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
