import {
  CHANGE_RESULT,
  CHANGE_ERROR,
  CHANGE_SUBMITTING,
  CHANGE_DATA,
  SUBMIT,
} from './constants';

export function changeResultAction(result) {
  return {
    type: CHANGE_RESULT,
    result,
  };
}
export function changeErrorAction(error) {
  return {
    type: CHANGE_ERROR,
    error,
  };
}
export function changeSubmittingAction(submitting) {
  return {
    type: CHANGE_SUBMITTING,
    submitting,
  };
}
export function changeDataAction(data) {
  return {
    type: CHANGE_DATA,
    data,
  };
}
export function submitAction() {
  return {
    type: SUBMIT,
  };
}
