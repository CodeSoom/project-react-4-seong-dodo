import { render } from '@testing-library/react';

import BreakDownContainer from './BreakDownContainer';

test('BreakDownContainer', () => {
  const { container } = render(<BreakDownContainer />);

  expect(container).toHaveTextContent('수입');
  expect(container).toHaveTextContent('지출');
});
