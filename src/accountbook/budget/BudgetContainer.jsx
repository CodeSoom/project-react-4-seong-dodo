/* eslint-disable no-alert */
import { useDispatch, useSelector } from 'react-redux';

import BudgetForm from './BudgetForm';

import {
  changeBudget,
  sendBudget,
} from '../../reducers/accountbook';

export default function BudgetContainer() {
  const dispatch = useDispatch();

  const { accessToken, budget, monthlyTransaction } = useSelector((state) => ({
    accessToken: state.user.accessToken,
    budget: state.accountbook.budget,
    monthlyTransaction: state.accountbook.monthlyTransaction,
  }));

  const handleChange = ({ value }) => {
    dispatch(changeBudget({ value }));
  };

  const handleSubmit = () => {
    if (!accessToken) {
      alert('로그인이 필요한 서비스입니다.');
      return;
    }
    if (budget === '' || budget === 0) {
      alert('예산을 입력해주세요');
      return;
    }
    if (monthlyTransaction.length !== 0) {
      const { year, month } = monthlyTransaction[0];

      dispatch(sendBudget({ year, month }));
    }
  };

  return (
    <BudgetForm
      budget={budget}
      onChange={handleChange}
      onSubmit={handleSubmit}
    />
  );
}
