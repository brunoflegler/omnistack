import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import { reducer as toastr } from 'react-redux-toastr';
import { reducer as auth } from './auth';
import { reducer as team } from './teams';
import { reducer as project } from './projects';
import { reducer as member } from './members';

export default history => combineReducers({
  auth,
  team,
  project,
  member,
  toastr,
  router: connectRouter(history),
});
