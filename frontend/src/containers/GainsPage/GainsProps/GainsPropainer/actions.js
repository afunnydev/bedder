/*
 *
 * GainsPropainer actions
 *
 */

import {
  CHANGE_GAINSSUBMITTING,
  CHANGE_GAINSRESULT,
  CHANGE_GAINSERROR,
  CHANGE_GAINS1,
  CHANGE_GAINS2,
  CHANGE_GAINS3,
  SUBMIT,
  PROCESS,
  ACTION1,
  ACTION2,
  ACTION3,
} from './constants';

export function changeGainsSubmittingAction(gainsSubmitting) {
  return {
    type: CHANGE_GAINSSUBMITTING,
    gainsSubmitting,
  };
}
export function changeGainsResultAction(gainsResult) {
  return {
    type: CHANGE_GAINSRESULT,
    gainsResult,
  };
}
export function changeGainsErrorAction(gainsError) {
  return {
    type: CHANGE_GAINSERROR,
    gainsError,
  };
}
export function changeGains1Action(gains1) {
  return {
    type: CHANGE_GAINS1,
    gains1,
  };
}
export function changeGains2Action(gains2) {
  return {
    type: CHANGE_GAINS2,
    gains2,
  };
}
export function changeGains3Action(gains3) {
  return {
    type: CHANGE_GAINS3,
    gains3,
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
export function action1Action(action1) {
  return {
    type: ACTION1,
    action1,
  };
}
export function action2Action(action2) {
  return {
    type: ACTION2,
    action2,
  };
}
export function action3Action(action3) {
  return {
    type: ACTION3,
    action3,
  };
}
