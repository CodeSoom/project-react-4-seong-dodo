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
      budget: 0,
      year: 2021,
      month: 7,
    }));
  });

  function renderBudgetPage() {
    return render((
      <MemoryRouter>
        <BudgetPage />
      </MemoryRouter>
    ));
  }

  it('renders budget page text', () => {
    const { container } = renderBudgetPage();

    expect(container).toHaveTextContent('한 달 예산을 세워볼까요?');
  });

  it('renders budget setup control', () => {
    const { getByLabelText } = renderBudgetPage();

    expect(getByLabelText('한 달 예산')).not.toBeNull();
  });
});
