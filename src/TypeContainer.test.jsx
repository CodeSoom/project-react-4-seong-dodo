import { render } from '@testing-library/react';

import TypeContainer from './TypeContainer';

describe('TypeContainer', () => {
  it('renders type container', () => {
    const { container } = render(<TypeContainer />);

    expect(container).toHaveTextContent('분류');
    expect(container).toHaveTextContent('지출');
    expect(container).toHaveTextContent('수입');
  });
});
