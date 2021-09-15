import {
  postLogin,
  postJoin,
  fetchDailyTransaction,
  fetchMonthlyTransaction,
  postTransaction,
  putTransaction,
} from './api';

import ACCESS_TOKEN from '../../fixtures/access-token';
import DAILY_DATE from '../../fixtures/mockDailyData';
import TRANSACTION from '../../fixtures/mockExpenseTransaction';
import DAILY_TRANSACTION from '../../fixtures/daily-transaction';
import MONTHLY_TRANSACTION from '../../fixtures/monthly-transaction';

describe('api', () => {
  describe('user: postLogin', () => {
    const mockFetch = (data) => {
      global.fetch = jest.fn().mockResolvedValue({
        async json() { return data; },
      });
    };

    context('로그인 성공', () => {
      beforeEach(() => {
        mockFetch({ accessToken: ACCESS_TOKEN });
      });

      it('returns accessToken', async () => {
        const { accessToken } = await postLogin({
          email: 'test@test.com',
          password: 'test',
        });

        expect(accessToken).toEqual(ACCESS_TOKEN);
      });
    });

    context('로그인 실패 : 응답 코드 400', () => {
      describe('사용자가 등록되지 않은 이메일로 로그인 시도했을 경우', () => {
        beforeEach(() => {
          mockFetch({ accessToken: undefined, data: { status: 400 }, message: '등록되지 않은 사용자 입니다.' });
        });

        it('renders alert message', async () => {
          const { message } = await postLogin({
            email: 'test22@test.com',
            password: 'test',
          });

          expect(message).toEqual('등록되지 않은 사용자 입니다.');
        });
      });

      describe('사용자 비밀번호 불일치 할 경우', () => {
        beforeEach(() => {
          mockFetch({ accessToken: undefined, data: { status: 400 }, message: '비밀번호가 일치하지 않습니다.' });
        });

        it('renders alert message', async () => {
          const { message } = await postLogin({
            email: 'test@test.com',
            password: 'test11111',
          });

          expect(message).toEqual('비밀번호가 일치하지 않습니다.');
        });
      });
    });
  });

  describe('user: postJoin', () => {
    const mockFetch = (data) => {
      global.fetch = jest.fn().mockResolvedValue(
        data,
      );
    };

    beforeEach(() => {
      mockFetch({ status: 201 });
    });

    it('returns reponse', async () => {
      const result = await postJoin({
        email: 'test@test.com',
        password: 'test',
        age: '23',
      });

      expect(result.status).toEqual(201);
    });
  });

  describe('accountbook: fetchDailyTransaction', () => {
    const mockFetch = (data) => {
      global.fetch = jest.fn().mockResolvedValue({
        async json() { return data; },
      });
    };

    beforeEach(() => {
      mockFetch(DAILY_TRANSACTION);
    });

    it('returns daily transaction', async () => {
      const dailyTransaction = await fetchDailyTransaction({
        accessToken: ACCESS_TOKEN,
        dailyData: {
          year: 2021,
          month: 7,
          date: 1,
        },
      });

      expect(dailyTransaction).toEqual(DAILY_TRANSACTION);
    });
  });

  describe('accountbook: fetchMonthlyTransaction', () => {
    const mockFetch = (data) => {
      global.fetch = jest.fn().mockResolvedValue({
        async json() { return data; },
      });
    };

    beforeEach(() => {
      mockFetch(MONTHLY_TRANSACTION);
    });

    it('returns monthly transaction', async () => {
      const monthlyTransaction = await fetchMonthlyTransaction({
        accessToken: ACCESS_TOKEN,
        dailyData: {
          year: 2021,
          month: 7,
          date: 1,
        },
      });

      expect(monthlyTransaction).toEqual(MONTHLY_TRANSACTION);
    });
  });

  describe('accountbook: postTransaction', () => {
    const mockFetch = (data) => {
      global.fetch = jest.fn().mockResolvedValue(
        data,
      );
    };

    beforeEach(() => {
      mockFetch();
    });

    it('returns nothing', async () => {
      const result = await postTransaction({
        accessToken: ACCESS_TOKEN,
        dailyData: DAILY_DATE,
        transaction: TRANSACTION,
      });

      expect(result).toBeUndefined();
    });
  });

  describe('accountbook: putTransaction', () => {
    const mockFetch = (data) => {
      global.fetch = jest.fn().mockResolvedValue(
        data,
      );
    };

    beforeEach(() => {
      mockFetch();
    });

    it('returns nothing', async () => {
      const result = await putTransaction({
        accessToken: ACCESS_TOKEN,
        dailyData: DAILY_DATE,
        transaction: TRANSACTION,
      });

      expect(result).toBeUndefined();
    });
  });

  describe('accountbook: deleteTransaction', () => {
    const mockFetch = (data) => {
      global.fetch = jest.fn().mockResolvedValue(
        data,
      );
    };

    beforeEach(() => {
      mockFetch();
    });

    it('returns nothing', async () => {
      const result = await putTransaction({
        accessToken: ACCESS_TOKEN,
        dailyData: DAILY_DATE,
        transaction: TRANSACTION,
      });

      expect(result).toBeUndefined();
    });
  });
});
