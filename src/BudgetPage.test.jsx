import {
  MemoryRouter,
} from 'react-router-dom';

import { render } from '@testing-library/react';

import { useSelector } from 'react-redux';

import BudgetPage from './BudgetPage';

jest.mock('react-redux');

describe('BudgetPage', () => {
  beforeEach(() => {
    useSelector.mockImplementation((selector) => selector({
      budget: '',
    }));
  });

  it('renders budget page text', () => {
    const { container } = render((
      <MemoryRouter>
        <BudgetPage />
      </MemoryRouter>
    ));

    expect(container).toHaveTextContent('한 달 예산을 세워볼까요?');
  });

  it('renders budget setup control', () => {
    const { getByLabelText } = render((
      <MemoryRouter>
        <BudgetPage />
      </MemoryRouter>
    ));

    expect(getByLabelText('한 달 예산')).not.toBeNull();
  });
});
