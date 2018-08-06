import * as AuthStore from './auth.actions';

export interface State {
  token: string;
  authenticated: boolean;
}

const initialState: State = {
  token: null,
  authenticated: false
};

export function authReducer(state = initialState, action: AuthStore.ActionTypes) {
  switch (action.type) {
    case(AuthStore.SIGNUP):
    case(AuthStore.SIGNIN):
      return {
        ...state,
        authenticated: true
      };
    case(AuthStore.LOGOUT):
      return {
        ...state,
        authenticated: false,
        token: null
      };
    default:
      return state;
  }
}
