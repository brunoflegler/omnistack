import { all, takeLatest, fork } from 'redux-saga/effects';

import {
  signIn, signUp, signOut, getPermissions,
} from './auth';
import { AuthTypes } from '../ducks/auth';

import { getTeams, createNewTeam } from './teams';
import { TeamsTypes } from '../ducks/teams';

import { getProjects, createNewProject } from './projects';
import { ProjectsTypes } from '../ducks/projects';

import { getMembers, setUpdateMember, setInviteMember } from './members';
import { MembersTypes } from '../ducks/members';

export default function* rootSaga() {
  return yield all([
    fork(getPermissions),

    takeLatest(AuthTypes.SIGN_IN_REQUEST, signIn),
    takeLatest(AuthTypes.SIGN_UP_REQUEST, signUp),
    takeLatest(AuthTypes.SIGN_OUT, signOut),

    takeLatest(TeamsTypes.GET_TEAMS_REQUEST, getTeams),
    takeLatest(TeamsTypes.POST_NEW_TEAM_REQUEST, createNewTeam),

    takeLatest(TeamsTypes.SET_TEAM_ACTIVE, getProjects),
    takeLatest(TeamsTypes.SET_TEAM_ACTIVE, getPermissions),
    takeLatest(ProjectsTypes.GET_PROJECTS_REQUEST, getProjects),
    takeLatest(ProjectsTypes.POST_NEW_PROJECT_REQUEST, createNewProject),

    takeLatest(MembersTypes.GET_MEMBERS_REQUEST, getMembers),
    takeLatest(MembersTypes.SET_UPDATE_MEMBER_REQUEST, setUpdateMember),
    takeLatest(MembersTypes.SET_INVITE_MEMBER_REQUEST, setInviteMember),
  ]);
}
