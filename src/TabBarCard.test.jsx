import { MemoryRouter } from 'react-router-dom';

import { render } from '@testing-library/react';

import TabBarCard from './TabBarCard';

test('TabBar', () => {
  render((
    <MemoryRouter>
      <TabBarCard />
    </MemoryRouter>
  ));
});
