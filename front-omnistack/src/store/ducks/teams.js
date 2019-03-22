import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* Types & Action Creators */

const { Types, Creators } = createActions({
  getTeamsRequest: null,
  getTeamsSuccess: ['data'],
  setTeamActive: ['team'],
  setTeamModalOpen: null,
  setTeamModalClose: null,
  postNewTeamRequest: ['name'],
  postNewTeamSuccess: ['team'],
  setTeamActiveNull: null,
});

export const TeamsTypes = Types;
export default Creators;

/* Initial State */

export const INITIAL_STATE = Immutable({
  data: [],
  teamActive: JSON.parse(localStorage.getItem('@omni:team')) || null,
  modal: false,
});

/* Reducers */

export const getSuccess = (state, { data }) => state.merge({ data });

export const selectTeam = (state, { team }) => {
  localStorage.setItem('@omni:team', JSON.stringify(team));
  return state.merge({ teamActive: team });
};

export const selectTeamNull = state => state.merge({ teamActive: null });

export const openModalTeam = state => state.merge({ modal: true });
export const closeModalTeam = state => state.merge({ modal: false });
export const newTeamSuccess = (state, { team }) => state.merge({ data: [...state.data, team] });

/* Reducers to types */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_TEAMS_SUCCESS]: getSuccess,
  [Types.SET_TEAM_ACTIVE]: selectTeam,
  [Types.SET_TEAM_MODAL_OPEN]: openModalTeam,
  [Types.SET_TEAM_MODAL_CLOSE]: closeModalTeam,
  [Types.POST_NEW_TEAM_SUCCESS]: newTeamSuccess,
  [Types.POST_NEW_TEAM_SUCCESS]: newTeamSuccess,
  [Types.SET_TEAM_ACTIVE_NULL]: selectTeamNull,
});
