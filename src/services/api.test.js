import {
  postLogin,
} from './api';

import ACCESS_TOKEN from '../../fixtures/access-token';

describe('api', () => {
  const mockFetch = (data) => {
    global.fetch = jest.fn().mockResolvedValue({
      async json() { return data; },
    });
  };

  describe('postLogin', () => {
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
});
