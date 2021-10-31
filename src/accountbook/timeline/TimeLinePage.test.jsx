import {
  MemoryRouter,
} from 'react-router-dom';

import { render } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';

import TimeLinePage from './TimeLinePage';

import ACCOUNTBOOK_STATE from '../../../fixtures/accountbook-initialState';

jest.mock('react-redux');

describe('TimeLinePage', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();
    useDispatch.mockImplementation(() => dispatch);

    useSelector.mockImplementation((selector) => selector({
      user: {
        accessToken: given.accessToken,
      },
      accountbook: {
        ...ACCOUNTBOOK_STATE,
        transactionHistoryResponseList: given.transactionHistoryResponseList,
      },
    }));
  });

  context('로그인을 하지 않았을 경우', () => {
    given('accessToken', () => undefined);
    given('transactionHistoryResponseList', () => []);

    it('비회원 상태일 경우 거래 내역 페이지를 보여준다.', () => {
      const { container } = render(
        <MemoryRouter>
          <TimeLinePage />
        </MemoryRouter>,
      );

      expect(container).toHaveTextContent('로그인으로 이동하기');
    });
  });
});
