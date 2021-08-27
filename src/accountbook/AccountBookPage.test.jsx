import { MemoryRouter } from 'react-router-dom';

import { render } from '@testing-library/react';

import AccountBookPage from './AccountBookPage';

test('AccountBookPage', () => {
  render((
    <MemoryRouter>
      <AccountBookPage />
    </MemoryRouter>
  ));
});
