import Transaction from './Transaction';

export default function DailyTransaction({
  histories, onClickEdit, onClickDelete, load,
}) {
  return (
    <>
      { histories === undefined
        ? null
        : (
          <>
            <Transaction
              histories={histories}
              onClickEdit={onClickEdit}
              onClickDelete={onClickDelete}
              load={load}
            />
          </>
        )}
    </>
  );
}
