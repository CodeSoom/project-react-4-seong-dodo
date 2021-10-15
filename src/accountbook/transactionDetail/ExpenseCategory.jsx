import styled from '@emotion/styled';
import colors from '../../style/colors';
import mediaquery from '../../style/mediaquery';

const Container = styled.div(mediaquery({
  margin: '0 auto',
  lineHeight: [1.5, 1.5, 2.5, 3.5, 7],
  '& select': {
    width: ['60%', '60%', '60%', '60%', '65%'],
    padding: ['0.4em', '0.4em', '0.4em', '0.5em', '1em 0.5em'],
    border: 'none',
    borderRadius: '1em',
    color: `${colors.gray_text03}`,
    fontSize: ['0.6em', '0.6em', '0.7em', '1em', '0.9em'],
    outlineStyle: 'none',
  },
  '& option': {
    padding: '0.6em',
    border: 'none',
    borderRadius: '2em',
    color: `${colors.gray_text02}`,
  },
}));

export default function ExpenseCategory({ transaction, onChange }) {
  const expenseCategories = [
    '미분류',
    '식비', '카페/간식', '술/유흥', '생활',
    '온라인쇼핑', '패션/쇼핑', '뷰티/미용', '교통',
    '자동차', '주거/통신', '의료/건강', '금융',
    '문화/여가', '여행/숙박', '교육/학습', '자녀/육아',
    '반려동물', '경조/선물',
  ];

  function handleChange(event) {
    const { target } = event;
    onChange({ value: target.value });
  }

  function isSelectedCategory() {
    return expenseCategories.find((categoryName) => transaction.category.value === categoryName);
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
          expenseCategories.map((category) => (
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
