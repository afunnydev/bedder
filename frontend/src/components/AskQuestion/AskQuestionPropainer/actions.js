/*
 *
 * * AskQuestionPropainer actions
 *
 */

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

export function changeSubmitResultAction(submitResult) {
  return {
    type: CHANGE_SUBMITRESULT,
    submitResult,
  };
}
export function changeSubmitErrorAction(submitError) {
  return {
    type: CHANGE_SUBMITERROR,
    submitError,
  };
}
export function changeSubmittingAction(submitting) {
  return {
    type: CHANGE_SUBMITTING,
    submitting,
  };
}
export function changeSubjectAction(subject) {
  return {
    type: CHANGE_SUBJECT,
    subject,
  };
}
export function changeMessageAction(message) {
  return {
    type: CHANGE_MESSAGE,
    message,
  };
}
export function changeTypeAction(ticketType) {
  return {
    type: CHANGE_TYPE,
    ticketType,
  };
}
export function changeNameAction(name) {
  return {
    type: CHANGE_NAME,
    name,
  };
}
export function changeStatusAction(status) {
  return {
    type: CHANGE_STATUS,
    status,
  };
}
export function submitAction(submit) {
  return {
    type: SUBMIT,
    submit,
  };
}
export function processAction(process) {
  return {
    type: PROCESS,
    process,
  };
}
export function openAction(open) {
  return {
    type: OPEN,
    open,
  };
}
export function closeAction(close) {
  return {
    type: CLOSE,
    close,
  };
}
