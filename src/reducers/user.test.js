import reducer, {
  setAccessToken,
  changeJoinField,
  changeLoginField,
  clearJoinField,
  clearLoginField,
  logout,
} from './user';

describe('user reducer', () => {
  context('when previous state is undefined', () => {
    const initialState = {
      accessToken: '',
      loginFields: {
        email: '',
        password: '',
      },
      joinFields: {
        age: '',
        email: '',
        password: '',
        repassword: '',
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

  describe('changeJoinField action', () => {
    const initialState = {
      joinFields: {
        age: '',
        email: '',
        password: '',
        repassword: '',
      },
    };

    it('changes age Field', () => {
      const state = reducer(initialState,
        changeJoinField({ name: 'age', value: '23' }));

      expect(state.joinFields.age).toBe('23');
    });

    it('changes email Field', () => {
      const state = reducer(initialState,
        changeJoinField({ name: 'email', value: 'test@test.com' }));

      expect(state.joinFields.email).toBe('test@test.com');
    });

    it('changes password Field', () => {
      const state = reducer(initialState,
        changeJoinField({ name: 'password', value: 'test' }));

      expect(state.joinFields.password).toBe('test');
    });

    it('changes repassword Field', () => {
      const state = reducer(initialState,
        changeJoinField({ name: 'repassword', value: 'test' }));

      expect(state.joinFields.repassword).toBe('test');
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

  describe('clearJoinField', () => {
    it('clears fields of join', () => {
      const initialState = {
        joinFields: {
          age: '23',
          email: 'test@test.com',
          password: '12345test',
          repassword: '12345test',
        },
      };

      const state = reducer(initialState, clearJoinField());

      expect(state.joinFields.age).toBe('');
      expect(state.joinFields.email).toBe('');
      expect(state.joinFields.password).toBe('');
      expect(state.joinFields.repassword).toBe('');
    });
  });

  describe('clearLoginField', () => {
    it('clears fields of login', () => {
      const initialState = {
        loginFields: {
          email: 'EMAIl',
          password: 'PASSWORD',
        },
      };

      const state = reducer(initialState, clearLoginField());

      expect(state.loginFields.email).toBe('');
      expect(state.loginFields.password).toBe('');
    });
  });

  describe('logout', () => {
    it('clears access token', () => {
      const initialState = {
        accessToken: 'ACCESS_TOKEN',
      };

      const state = reducer(initialState, logout());

      expect(state.accessToken).toBe('');
    });
  });
});
