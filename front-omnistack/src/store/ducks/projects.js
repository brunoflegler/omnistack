import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* Types & Action Creators */

const { Types, Creators } = createActions({
  getProjectsRequest: null,
  getProjectsSuccess: ['data'],
  setProjectModalOpen: null,
  setProjectModalClose: null,
  postNewProjectRequest: ['title'],
  postNewProjectSuccess: ['project'],
});

export const ProjectsTypes = Types;
export default Creators;

/* Initial State */

export const INITIAL_STATE = Immutable({
  data: [],
  modal: false,
});

/* Reducers */

export const getProjects = (state, { data }) => state.merge({ data });
export const openModalProject = state => state.merge({ modal: true });
export const closeModalProject = state => state.merge({ modal: false });
export const newProjectSuccess = (state, { project }) => state.merge({
  data: [...state.data, project],
});

/* Reducers to types */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_PROJECTS_SUCCESS]: getProjects,
  [Types.SET_PROJECT_MODAL_OPEN]: openModalProject,
  [Types.SET_PROJECT_MODAL_CLOSE]: closeModalProject,
  [Types.POST_NEW_PROJECT_SUCCESS]: newProjectSuccess,
});
