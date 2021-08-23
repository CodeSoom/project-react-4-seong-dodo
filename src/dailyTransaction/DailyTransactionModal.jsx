import DailyTransactionContainer from './DailyTransactionContainer';

export default function DailyTransactionModal({
  monthlyTransaction, dailyData, onClick,
}) {
  return (
    <DailyTransactionContainer
      monthlyTransaction={monthlyTransaction}
      dailyData={dailyData}
      onClick={onClick}
    />
  );
}
