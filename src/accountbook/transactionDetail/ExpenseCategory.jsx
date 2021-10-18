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
