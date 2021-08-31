import reducer, {
  setAccessToken,
  changeLoginField,
} from './user';

describe('user reducer', () => {
  context('when previous state is undefined', () => {
    const initialState = {
      accessToken: '',
      loginFields: {
        email: '',
        password: '',
      },
    };

    it('returns initialState', () => {
      const state = reducer(undefined, { type: 'action' });

      expect(state).toEqual(initialState);
    });
  });

  describe('setAccessToken', () => {
    it('changes access token', () => {
      const initialState = {
        accessToken: '',
      };

      const state = reducer(initialState, setAccessToken('ACCESS_TOKEN'));

      expect(state.accessToken).toBe('ACCESS_TOKEN');
    });
  });

  describe('changeLoginField action', () => {
    const initialState = {
      loginFields: {
        email: '',
        password: '',
      },
    };

    it('changes email Field', () => {
      const state = reducer(initialState,
        changeLoginField({ name: 'email', value: '123@test.com' }));

      expect(state.loginFields.email).toBe('123@test.com');
    });

    it('changes password Field', () => {
      const state = reducer(initialState,
        changeLoginField({ name: 'password', value: '123test' }));

      expect(state.loginFields.password).toBe('123test');
    });
  });
});
