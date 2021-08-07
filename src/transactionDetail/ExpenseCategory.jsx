import styled from '@emotion/styled';
import colors from '../style/colors';
import mediaquery from '../style/mediaquery';

const Container = styled.div(mediaquery({
  margin: '0 auto',
  '& select': {
    width: ['60%', '60%', '60%', '70%', '70%'],
    padding: ['.4em', '.4em', '.4em', '.8em', '.8em'],
    border: 'none',
    borderRadius: '1em',
    color: `${colors.gray_text03}`,
    fontSize: ['.6em', '.6em', '.7em', '.8em', '.8em'],
    outlineStyle: 'none',
  },
  '& option': {
    padding: '.6em',
    border: 'none',
    borderRadius: '2em',
    color: `${colors.gray_text02}`,
  },
}));

export default function ExpenseCategory({ onChange }) {
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

  return (
    <Container>
      <select
        data-testid="select"
        name="expense-category"
        onChange={handleChange}
        defaultValue={expenseCategories[0]}
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
