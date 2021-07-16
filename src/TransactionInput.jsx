import InputField from './InputField';
import TypeContainer from './TypeContainer';

export default function TransactionInput({
  fields, onChange,
}) {
  const { breakdown, source, memo } = fields;

  return (
    <>
      <div>
        <InputField
          label="거래처명"
          id="breakdown"
          name="breakdown"
          type="number"
          placeholder="0"
          value={breakdown}
          onChange={onChange}
        />
        <span>원</span>
        <span>🖋️</span>
      </div>

      <div>
        <TypeContainer />
      </div>

      <div>
        <InputField
          label="거래처"
          id="source"
          name="source"
          type="text"
          placeholder="거래처명을 입력하세요."
          value={source}
          onChange={onChange}
        />
      </div>

      <div>
        <InputField
          label="메모"
          id="memo"
          name="memo"
          type="text"
          placeholder="메모를 입력하세요"
          value={memo}
          onChange={onChange}
        />
      </div>

      <div>
        저장
      </div>
    </>
  );
}
