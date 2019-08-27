
import { USER_LOGIN, USER_LOGOUT, CHANGE_ROLE } from './constants';

export function userLoginAction(user) {
  // console.log('export function userLoginAction(user) {', user);
  return {
    type: USER_LOGIN,
    user
  };
}

export function userLogoutAction() {
  return {
    type: USER_LOGOUT
  };
}

export function changeRoleAction(role) {
  return {
    type: CHANGE_ROLE,
    role
  };
}

