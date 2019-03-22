import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* Types & Action Creators */

const { Types, Creators } = createActions({
  getMembersRequest: null,
  getMembersSuccess: ['data'],
  setMembersModalOpen: null,
  setMembersModalClose: null,
  setUpdateMemberRequest: ['id', 'roles'],
  setInviteMemberRequest: ['email'],
});

export const MembersTypes = Types;
export default Creators;

/* Initial State */

export const INITIAL_STATE = Immutable({
  modal: false,
  data: [],
});

/* Reducers */

export const openModalMembers = state => state.merge({ modal: true });
export const closeModalMembers = state => state.merge({ modal: false });
export const getMembers = (state, { data }) => state.merge({ data });
export const updateMember = (state, { id, roles }) => state.merge({
  data: state.data.map(member => (member.id === id ? { ...member, roles } : member)),
});

/* Reducers to types */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_MEMBERS_MODAL_OPEN]: openModalMembers,
  [Types.SET_MEMBERS_MODAL_CLOSE]: closeModalMembers,
  [Types.GET_MEMBERS_SUCCESS]: getMembers,
  [Types.SET_UPDATE_MEMBER_REQUEST]: updateMember,
});
