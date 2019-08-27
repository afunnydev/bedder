/**
 *
 * SignUpPropainer
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
  makeSelectSignUpPropainer,
  makeSelectFacebookSubmitting,
  makeSelectFacebookResult,
  makeSelectFacebookError,
  makeSelectFacebookOauthResult,
} from './selectors';
import {
  changeFacebookSubmittingAction,
  changeFacebookResultAction,
  changeFacebookErrorAction,
  changeFacebookOauthResultAction,
  submitFacebookAction,
  successFacebookAction,
} from './actions';
import {
  CHANGE_FACEBOOKSUBMITTING,
  CHANGE_FACEBOOKRESULT,
  CHANGE_FACEBOOKERROR,
  CHANGE_FACEBOOKOAUTHRESULT,
  SUBMITFACEBOOK,
  SUCCESSFACEBOOK,
} from './constants';

import { mapStateToProps, mapDispatchToProps } from './mapProps';

import reducer from './reducer';

/* eslint-disable react/prefer-stateless-function */
export class SignUpPropainer extends React.Component {
  render() {
    return (
      /* <div style={{display: 'none'}}>
        
FacebookSubmitting: <input onChange={this.props.onChangeFacebookSubmitting} value={this.props.facebookSubmitting} />
FacebookResult: <input onChange={this.props.onChangeFacebookResult} value={this.props.facebookResult} />
FacebookError: <input onChange={this.props.onChangeFacebookError} value={this.props.facebookError} />
FacebookOauthResult: <input onChange={this.props.onChangeFacebookOauthResult} value={this.props.facebookOauthResult} />
        
SubmitFacebook: <button onClick={this.props.submitFacebook}>TRY</button>
SuccessFacebook: <button onClick={this.props.successFacebook}>TRY</button> 
      </div> */
      <React.Fragment>{this.props.children}</React.Fragment>
    );
  }
}

SignUpPropainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'signUpPagePropainer', reducer });

export default compose(
  withReducer,
  withConnect,
)(SignUpPropainer);

export { withConnect };
