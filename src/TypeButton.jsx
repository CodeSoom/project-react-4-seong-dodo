export default function TypeButton({ name, onClick }) {
  const id = `button-${name}`;

  return (
    <>
      <button
        type="button"
        id={id}
        name={name}
        onClick={onClick}
      >
        {name}
      </button>
    </>
  );
}
