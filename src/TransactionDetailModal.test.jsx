import { render } from '@testing-library/react';

import TransactionDetailModal from './TransactionDetailModal';

describe('TransactionDetailModal', () => {
  it('renders transaction modal', () => {
    const { container } = render(
      <TransactionDetailModal />,
    );

    expect(container).toHaveTextContent('내역추가');
    expect(container).toHaveTextContent('상세페이지');
  });
});
