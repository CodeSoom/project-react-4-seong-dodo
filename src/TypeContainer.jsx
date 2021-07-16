export default function TypeContainer() {
  function handleClick() {
    // Todo: ...
  }

  return (
    <div>
      분류
      <div>
        <button
          type="button"
          onClick={handleClick}
        >
          지출
        </button>
      </div>
      <div>
        <button
          type="button"
          onClick={handleClick}
        >
          수입
        </button>
      </div>
    </div>
  );
}
