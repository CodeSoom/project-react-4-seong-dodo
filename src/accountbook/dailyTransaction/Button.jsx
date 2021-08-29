export default function Button({ value, onClick }) {
  return (
    <>
      <button
        type="button"
        name={value}
        onClick={onClick}
      >
        {value}
      </button>
    </>
  );
}
