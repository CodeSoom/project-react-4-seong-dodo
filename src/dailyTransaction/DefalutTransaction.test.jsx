import { render } from '@testing-library/react';

import DefalutTransaction from './DefalutTransaction';

describe('DefalutTransaction', () => {
  it('renders DefalutTransaction', () => {
    const { container } = render(<DefalutTransaction />);

    expect(container).toHaveTextContent('총 0 건');
  });
});
