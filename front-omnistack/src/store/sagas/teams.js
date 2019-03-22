import { call, put } from 'redux-saga/effects';
import { actions as toastrActions } from 'react-redux-toastr';
import api from '../../services/api';
import TeamsActions from '../ducks/teams';

export function* getTeams() {
  try {
    const response = yield call(api.get, 'teams');

    yield put(TeamsActions.getTeamsSuccess(response.data));
  } catch (err) {
    yield put(
      toastrActions.add({
        type: 'error',
        title: 'Erro na operação',
        message: 'Houve um erro, tente novamente!',
      }),
    );
  }
}

export function* createNewTeam({ name }) {
  try {
    const response = yield call(api.post, 'teams', { name });
    yield put(TeamsActions.postNewTeamSuccess(response.data));
    yield put(TeamsActions.setTeamModalClose());
  } catch (err) {
    console.tron.log(err);
  }
}
