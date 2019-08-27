/*
 *
 * * AskQuestionPropainer reducer
 *
 */

import { fromJS } from 'immutable';
import {
  CHANGE_SUBMITRESULT,
  CHANGE_SUBMITERROR,
  CHANGE_SUBMITTING,
  CHANGE_SUBJECT,
  CHANGE_MESSAGE,
  CHANGE_TYPE,
  CHANGE_NAME,
  CHANGE_STATUS,
  SUBMIT,
  PROCESS,
  OPEN,
  CLOSE,
} from './constants';

export const initialState = fromJS({
  submitResult: null,
  submitError: null,
  submitting: false,
  subject: '',
  message: '',
  type: {},
  name: '',
  status: '',
});

function askQuestionPropainerReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_SUBMITRESULT:
      return state.set('submitResult', action.submitResult).set('submitting', false);
    case CHANGE_SUBMITERROR:
      return state.set('submitError', action.submitError).set('submitting', false);
    case CHANGE_SUBMITTING:
      return state.set('submitting', action.submitting);
    case CHANGE_SUBJECT:
      return state.set('subject', action.subject);
    case CHANGE_MESSAGE:
      return state.set('message', action.message);
    case CHANGE_TYPE:
      return state.set('type', action.ticketType);
    case CHANGE_NAME:
      return state.set('name', action.name);
    case CHANGE_STATUS:
      return state.set('status', action.status);
    case SUBMIT:
      // alert('change this submit');
      return state.set('submitting', true);
    case PROCESS:
      // alert('change this process');
      return state;
    case OPEN:
      // alert('change this open');
      return state;
    case CLOSE:
      // alert('change this close');
      return state;
    default:
      return state;
  }
}

export default askQuestionPropainerReducer;
