import {
  Link,
} from 'react-router-dom';

export default function HomePage() {
  return (
    <div>
      <h2>Mine</h2>
      <div>
        <Link to="/budget">
          한 달 예산을 세워볼까요?
        </Link>
      </div>
      <div>
        <Link to="/calendar">
          자산 관리 시작해볼까요?
        </Link>
      </div>
    </div>
  );
}
