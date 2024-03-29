import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* Types & Action Creators */

const { Types, Creators } = createActions({
  signInRequest: ['email', 'password'],
  signInSuccess: ['token'],
  signUpRequest: ['name', 'email', 'password'],
  getPermissionsSuccess: ['roles', 'permissions'],
  signOut: null,
});

export const AuthTypes = Types;
export default Creators;

/* Initial State */

export const INITIAL_STATE = Immutable({
  signedIn: !!localStorage.getItem('@omni:token'),
  token: localStorage.getItem('@omni:token') || null,
  roles: [],
  permissions: [],
});

/* Reducers */

export const success = (state, { token }) => state.merge({
  signedIn: true,
  token
});
export const logout = state => 
state.merge({ signedIn: false, token: null });
export const permissionsSuccess = (state, { roles, permissions }) => state.merge({
  roles,
  permissions,
});

/* Reducers to types */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SIGN_IN_SUCCESS]: success,
  [Types.GET_PERMISSIONS_SUCCESS]: permissionsSuccess,
  [Types.SIGN_OUT]: logout,
});
