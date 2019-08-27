import { fromJS } from 'immutable';
import { 
  USER_LOGIN, 
  USER_LOGOUT, 
  CHANGE_ROLE, 
  ROLE_TRAVELER
} from './constants';

export const initialState = fromJS({
  user: false,
  role: ROLE_TRAVELER,
});

function AppContextReducer(state = initialState, action) {
  switch (action.type) {
    case USER_LOGIN:
      return state.set('user', action.user);
    case USER_LOGOUT:
      return state.set('user', false);
    case CHANGE_ROLE:
      return state.set('role', action.role);
    default:
      return state;
  }
}

export default AppContextReducer;
