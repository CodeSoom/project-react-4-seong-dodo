import colors from '../../style/colors';

const ExpenseColor = {
  color: `${colors.gray_text05}`,
  fontWeight: '300',
};

const IncomeColor = {
  color: `${colors.teal_text02}`,
  fontWeight: '300',
};

export default function DateData({ histories }) {
  const expenseStyle = () => ExpenseColor;

  const incomeStyle = () => IncomeColor;

  return (
    <>
      { histories === undefined
        ? null
        : (
          <>
            {
              histories.totalExpense === ''
                ? null
                : (
                  <>
                    <div
                      style={expenseStyle()}
                    >
                      -
                      {' '}
                      {histories.totalExpense}
                      원
                    </div>
                  </>
                )
            }
            {
              histories.totalIncome === ''
                ? null
                : (
                  <>
                    <div
                      style={incomeStyle()}
                    >
                      +
                      {' '}
                      {histories.totalIncome}
                      원
                    </div>
                  </>
                )
            }
          </>
        )}
    </>
  );
}
