import reducer, {
  changeLoginField,
} from './user';

describe('user reducer', () => {
  context('without state', () => {
    const initialState = {
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

  context('with state', () => {
    const initialState = {
      loginFields: {
        email: '',
        password: '',
      },
    };

    describe('changeLoginField action', () => {
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
});
