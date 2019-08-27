import Lockr from 'lockr';

import { userLogoutAction, userLoginAction } from 'containers/AppContext/actions';

class Bedder {
  constructor() {
    this._processStorage();
    this.isLoggedIn = false;
  }

  // internal

  _processStorage() {
    try {
      Lockr.prefix = 'bedder_app';
    } catch (e) {
      throw new Error(e);
    }
  }

  // storage

  set(key, val, options = {}) {
    Lockr.set(key, val, options);
  }

  get(key) {
    return Lockr.get(key);
  }

  // auth

  getHeaderToken() {
    if (this.getToken()) {
      return `Bearer ${this.getToken()}`;
    }
    return 'None';
  }

  notUser() {
    return !this.getUser();
  }

  onlyForUser(lh) {
    if (lh) {
      lh.push('/signUp?signUpBeforeContinue');
    }
  }

  setToken(token) {
    this.set('bedder_auth_token', token);
  }

  getToken() {
    return this.get('bedder_auth_token');
  }

  setUser(user) {
    this.set('bedder_auth_user', user);
  }

  getUser() {
    return this.get('bedder_auth_user');
  }

  login(dispatch = false) {
    this.isLoggedIn = true;
    if (dispatch) {
      dispatch(userLoginAction(this.getUser()));
    }
  }

  logout() {
    this.set('bedder_auth_token', null);
    this.set('bedder_auth_user', null);
    // dispatch(userLogoutAction());
  }

  onAppContextDidMount(dispatch) {
    if (this.getToken() && this.getUser()) {
      dispatch(userLoginAction(this.getUser()));
    }
  }
}

export default new Bedder();
