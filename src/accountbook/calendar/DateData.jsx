import styled from '@emotion/styled';
import colors from '../../style/colors';
import mediaquery from '../../style/mediaquery';

import { exchangeRegEX, replaceString, removeDecimalPoint } from '../../utils/utils';

const HiddenText = styled.div(mediaquery({
  display: ['none', 'none', 'none', 'initial', 'initial'],
}));

const MoreText = styled.div(mediaquery({
  display: ['initial', 'initial', 'initial', 'none', 'none'],
}));

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
                      <HiddenText>
                        -
                        {' '}
                        {exchangeRegEX(replaceString(removeDecimalPoint(histories.totalExpense)))}
                        원
                      </HiddenText>
                      <MoreText>
                        더보기
                      </MoreText>
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
                      <HiddenText>
                        +
                        {' '}
                        {exchangeRegEX(replaceString(removeDecimalPoint(histories.totalIncome)))}
                        원
                      </HiddenText>
                      <MoreText>
                        더보기
                      </MoreText>
                    </div>
                  </>
                )
            }
          </>
        )}
    </>
  );
}
