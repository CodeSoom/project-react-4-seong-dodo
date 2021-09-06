import colors from '../../style/colors';

import { exchangeRegEX, replaceString, removeDecimalPoint } from '../../utils/utils';

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
              histories.totalExpense === '0.0'
                ? null
                : (
                  <>
                    <div
                      style={expenseStyle()}
                    >
                      -
                      {' '}
                      {exchangeRegEX(replaceString(removeDecimalPoint(histories.totalExpense)))}
                      원
                    </div>
                  </>
                )
            }
            {
              histories.totalIncome === '0.0'
                ? null
                : (
                  <>
                    <div
                      style={incomeStyle()}
                    >
                      +
                      {' '}
                      {exchangeRegEX(replaceString(removeDecimalPoint(histories.totalIncome)))}
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
