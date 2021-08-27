import { useDispatch, useSelector } from 'react-redux';

import BudgetForm from './BudgetForm';

import {
  changeBudget,
} from '../../reducers/accountbook';

export default function BudgetContainer() {
  const dispatch = useDispatch();

  const budget = useSelector((state) => state.accountbook.budget);

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
