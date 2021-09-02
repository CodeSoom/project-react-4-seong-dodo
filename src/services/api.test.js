import {
  postLogin,
  postJoin,
} from './api';

import ACCESS_TOKEN from '../../fixtures/access-token';

describe('api', () => {
  describe('postLogin', () => {
    const mockFetch = (data) => {
      global.fetch = jest.fn().mockResolvedValue({
        async json() { return data; },
      });
    };

    beforeEach(() => {
      mockFetch({ accessToken: ACCESS_TOKEN });
    });

    it('returns accessToken', async () => {
      const accessToken = await postLogin({
        email: 'test@test.com',
        password: 'test',
      });

      expect(accessToken).toEqual(ACCESS_TOKEN);
    });
  });

  describe('postJoin', () => {
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
});
