import styled from '@emotion/styled';
import mediaquery from '../style/mediaquery';

const DataBox = styled.div(mediaquery({
  margin: '0 auto',
  padding: '0',
  fontSize: '.1em',
}));

export default function DateData({ histories }) {
  return (
    <DataBox>
      { histories === undefined
        ? null
        : (
          <>
            {
              histories.totalExpense === 0
                ? null
                : (
                  <>
                    <div>
                      -
                      {' '}
                      {histories.totalExpense}
                      원
                    </div>
                  </>
                )
            }
            {
              histories.totalIncome === 0
                ? null
                : (
                  <>
                    <div>
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
    </DataBox>
  );
}
