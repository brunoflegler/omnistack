import { call, put, select } from 'redux-saga/effects';
import { actions as toastrActions } from 'react-redux-toastr';
import { push } from 'connected-react-router';

import api from '../../services/api';
import AuthActions from '../ducks/auth';
import TeamActions from '../ducks/teams';

export function* signIn({ email, password }) {
  try {
    const response = yield call(api.post, 'sessions', { email, password });
    localStorage.setItem('@omni:token', response.data.token);

    yield put(AuthActions.signInSuccess(response.data.token));
    yield put(push('/'));
  } catch (err) {
    yield put(
      toastrActions.add({
        type: 'error',
        title: 'Falha no login',
        message: 'Verifique seu e-mail/login',
      }),
    );
  }
}

export function* signUp({ name, email, password }) {
  try {
    const response = yield call(api.post, 'users', { name, email, password });
    localStorage.setItem('@omni:token', response.data.token);

    yield put(AuthActions.signInSuccess(response.data.token));
    yield put(push('/'));
  } catch (err) {
    yield put(
      toastrActions.add({
        type: 'error',
        title: 'Falha ao Cadastrar um usuário',
        message: 'Verifique se você foi realmente convidado!',
      }),
    );
  }
}

export function* signOut() {
  try {
    localStorage.removeItem('@omni:token');
    localStorage.removeItem('@omni:team');

    yield put(TeamActions.setTeamActiveNull());

    yield put(push('/signin'));
  } catch (err) {
    yield put(
      toastrActions.add({
        type: 'error',
        title: 'Falha no Logout',
        message: 'Houve um erro, tente novamente!',
      }),
    );
  }
}

export function* getPermissions() {
  const team = yield select(state => state.team.teamActive);
  const signedIn = yield select(state => state.auth.signedIn);

  if (!signedIn || !team) return;

  const response = yield call(api.get, 'permissions');

  const { roles, permissions } = response.data;

  yield put(AuthActions.getPermissionsSuccess(roles, permissions));
}
