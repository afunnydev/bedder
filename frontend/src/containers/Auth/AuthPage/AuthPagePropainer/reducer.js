/*
 *
 * AuthPagePropainer reducer
 *
 */

import { fromJS } from 'immutable';
import {
  CHANGE_FACEBOOKSUBMITTING,
  CHANGE_FACEBOOKRESULT,
  CHANGE_FACEBOOKERROR,
  CHANGE_FACEBOOKOAUTHRESULT,
  SUBMITFACEBOOK,
  SUCCESSFACEBOOK,
} from './constants';

export const initialState = fromJS({
  facebookSubmitting: '',
  facebookResult: '',
  facebookError: '',
  facebookOauthResult: '',
});

function authPagePropainerReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_FACEBOOKSUBMITTING:
      return state.set('facebookSubmitting', action.facebookSubmitting);
    case CHANGE_FACEBOOKRESULT:
      return state.set('facebookResult', action.facebookResult).set('facebookSubmitting', false);
    case CHANGE_FACEBOOKERROR:
      return state.set('facebookError', action.facebookError).set('facebookSubmitting', false);
    case CHANGE_FACEBOOKOAUTHRESULT:
      return state.set('facebookOauthResult', action.facebookOauthResult).set('facebookSubmitting', true);
    case SUBMITFACEBOOK:
      // alert('change this submitFacebook');
      return state.set('facebookSubmitting', true);
    case SUCCESSFACEBOOK:
      // alert('change this successFacebook');
      return state.set('facebookSubmitting', false);
    default:
      return state;
  }
}

export default authPagePropainerReducer;
