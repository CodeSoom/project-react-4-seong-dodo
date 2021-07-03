import { useDispatch, useSelector } from 'react-redux';

import BudgetForm from './BudgetForm';

import {
  changeBudget,
} from './slice';

import { get } from './utils';

export default function BudgetContainer() {
  const dispatch = useDispatch();

  const budget = useSelector(get('budget'));

  const handleChange = ({ value }) => {
    dispatch(changeBudget({ value }));
  };

  return (
    <BudgetForm
      budget={budget}
      onChange={handleChange}
    />
  );
}
