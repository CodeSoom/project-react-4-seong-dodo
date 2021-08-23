import DefalutTransaction from './DefalutTransaction';
import TransactionData from './TransactionData';
import Transaction from './Transaction';

export default function DailyTransaction({
  monthlyTransaction, dailyData, onClickEdit, onClickDelete,
}) {
  const histories = monthlyTransaction.find(
    (daily) => daily.year === dailyData.year
  && daily.month === dailyData.month
  && daily.date === dailyData.date
  && daily.day === dailyData.day,
  );

  return (
    <>
      { histories === undefined
        ? <DefalutTransaction />
        : (
          <>
            <TransactionData
              histories={histories}
            />
            <Transaction
              histories={histories}
              onClickEdit={onClickEdit}
              onClickDelete={onClickDelete}
            />
          </>
        )}
    </>
  );
}
