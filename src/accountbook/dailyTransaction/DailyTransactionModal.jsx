import DailyTransactionContainer from './DailyTransactionContainer';

export default function DailyTransactionModal({ dailyData, onClick }) {
  return (
    <DailyTransactionContainer
      dailyData={dailyData}
      onClick={onClick}
    />
  );
}
