import styled from '@emotion/styled';
import colors from '../style/colors';

const Container = styled.div({
  margin: '0 auto',
  '& select': {
    width: '70%',
    padding: '.8em',
    border: 'none',
    borderRadius: '1em',
    color: `${colors.gray_text03}`,
    fontSize: '.8em',
    outlineStyle: 'none',
  },
  '& option': {
    padding: '.6em',
    border: 'none',
    borderRadius: '2em',
    color: `${colors.gray_text02}`,
  },
});

export default function IncomeCategory({ onChange }) {
  const incomeCategories = [
    '미분류',
    '급여', '용돈', '금융수입', '사업수입', '기타수입',
  ];

  function handleChange(event) {
    const { target } = event;
    onChange({ value: target.value });
  }

  return (
    <Container>
      <select
        data-testid="select"
        name="income-category"
        onChange={handleChange}
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
