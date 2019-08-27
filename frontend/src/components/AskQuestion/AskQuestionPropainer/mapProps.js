import {
  changeSubmitResultAction,
  changeSubmitErrorAction,
  changeSubmittingAction,
  changeSubjectAction,
  changeMessageAction,
  changeTypeAction,
  changeNameAction,
  changeStatusAction,
  submitAction,
  processAction,
  openAction,
  closeAction,
} from './actions';
import {
  makeSelectSubmitResult,
  makeSelectSubmitError,
  makeSelectSubmitting,
  makeSelectSubject,
  makeSelectMessage,
  makeSelectType,
  makeSelectName,
  makeSelectStatus,
} from './selectors'; //{ makeSelectSupportTicketPropainer,
import { createStructuredSelector } from 'reselect';

const mapStateToProps = createStructuredSelector({
  //supportticketpropainer: makeSelectSupportTicketPropainer(),

  submitResult: makeSelectSubmitResult(),
  submitError: makeSelectSubmitError(),
  submitting: makeSelectSubmitting(),
  subject: makeSelectSubject(),
  message: makeSelectMessage(),
  type: makeSelectType(),
  name: makeSelectName(),
  status: makeSelectStatus(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,

    submit: evt => {
      dispatch(submitAction(evt));
    },
    process: evt => {
      dispatch(processAction(evt));
    },
    open: evt => {
      dispatch(openAction(evt));
    },
    close: evt => {
      dispatch(closeAction(evt));
    },
    onChangeSubmitResult: evt => {
      dispatch(changeSubmitResultAction(evt));
    },
    onChangeSubmitError: evt => {
      dispatch(changeSubmitErrorAction(evt));
    },
    onChangeSubmitting: evt => {
      dispatch(changeSubmittingAction(evt));
    },
    onChangeSubject: evt => {
      dispatch(changeSubjectAction(evt.target.value));
    },
    onChangeMessage: evt => {
      dispatch(changeMessageAction(evt.target.value));
    },
    onChangeSubjectVal: evt => {
      dispatch(changeSubjectAction(evt));
    },
    onChangeMessageVal: evt => {
      dispatch(changeMessageAction(evt));
    },
    onChangeType: evt => {
      dispatch(changeTypeAction(evt));
    },
    onChangeName: evt => {
      dispatch(changeNameAction(evt.target.value));
    },
    onChangeStatus: evt => {
      dispatch(changeStatusAction(evt));
    },
  };
}

export { mapStateToProps, mapDispatchToProps };
