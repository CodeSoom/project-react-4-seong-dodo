import { MemoryRouter } from 'react-router-dom';

import { render } from '@testing-library/react';

import TabBar from './TabBar';

test('TabBar', () => {
  render((
    <MemoryRouter>
      <TabBar />
    </MemoryRouter>
  ));
});
