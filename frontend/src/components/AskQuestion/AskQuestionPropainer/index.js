/**
 *
 * AskQuestionPropainer
 * ??????
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectReducer from 'utils/injectReducer';
import {
  makeSelectAskQuestionPropainer,
  makeSelectSubmitResult,
  makeSelectSubmitError,
  makeSelectSubmitting,
  makeSelectSubject,
  makeSelectMessage,
  makeSelectType,
  makeSelectName,
  makeSelectStatus,
} from './selectors';
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

import { mapStateToProps, mapDispatchToProps } from './mapProps';

import reducer from './reducer';

/* eslint-disable react/prefer-stateless-function */
export class AskQuestionPropainer extends React.Component {
  render() {
    return (
      /* <div style={{display: 'none'}}>
        
SubmitResult: <input onChange={this.props.onChangeSubmitResult} value={this.props.submitResult} />
SubmitError: <input onChange={this.props.onChangeSubmitError} value={this.props.submitError} />
Submitting: <input onChange={this.props.onChangeSubmitting} value={this.props.submitting} />
Subject: <input onChange={this.props.onChangeSubject} value={this.props.subject} />
Message: <input onChange={this.props.onChangeMessage} value={this.props.message} />
Type: <input onChange={this.props.onChangeType} value={this.props.type} />
Name: <input onChange={this.props.onChangeName} value={this.props.name} />
Status: <input onChange={this.props.onChangeStatus} value={this.props.status} />
        
Submit: <button onClick={this.props.submit}>TRY</button>
Process: <button onClick={this.props.process}>TRY</button>
Open: <button onClick={this.props.open}>TRY</button>
Close: <button onClick={this.props.close}>TRY</button> 
      </div> */
      <React.Fragment>{this.props.children}</React.Fragment>
    );
  }
}

AskQuestionPropainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'askQuestion', reducer });

export default compose(
  withReducer,
  withConnect,
)(AskQuestionPropainer);

export { withConnect };
