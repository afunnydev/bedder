import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the askQuestion state domain
 */

const selectAskQuestionDomain = state =>
  state.get('askQuestion', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by AskQuestion
 */

const makeSelectAskQuestion = () =>
  createSelector(selectAskQuestionDomain, substate => substate.toJS());

const makeSelectSubmitResult = () =>
  createSelector(selectAskQuestionDomain, state => state.get('submitResult'));
const makeSelectSubmitError = () =>
  createSelector(selectAskQuestionDomain, state => state.get('submitError'));
const makeSelectSubmitting = () =>
  createSelector(selectAskQuestionDomain, state => state.get('submitting'));
const makeSelectSubject = () =>
  createSelector(selectAskQuestionDomain, state => state.get('subject'));
const makeSelectMessage = () =>
  createSelector(selectAskQuestionDomain, state => state.get('message'));
const makeSelectType = () =>
  createSelector(selectAskQuestionDomain, state => state.get('type'));
const makeSelectName = () =>
  createSelector(selectAskQuestionDomain, state => state.get('name'));
const makeSelectStatus = () =>
  createSelector(selectAskQuestionDomain, state => state.get('status'));

export default makeSelectAskQuestion;
export {
  selectAskQuestionDomain,
  makeSelectAskQuestion,
  makeSelectSubmitResult,
  makeSelectSubmitError,
  makeSelectSubmitting,
  makeSelectSubject,
  makeSelectMessage,
  makeSelectType,
  makeSelectName,
  makeSelectStatus,
};
