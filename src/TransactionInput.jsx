export default function TransactionInput({ breakdown, onChange }) {
  function handleChange(event) {
    const { target: { name, value } } = event;
    onChange({ name, value });
  }

  return (
    <div>
      <label htmlFor="breakdown">
        거래처
      </label>
      <input
        type="number"
        placeholder="0"
        id="breakdown"
        name="breakdown"
        value={breakdown}
        onChange={handleChange}
      />
      <span>원</span>
      <span>🖋️</span>
    </div>
  );
}
