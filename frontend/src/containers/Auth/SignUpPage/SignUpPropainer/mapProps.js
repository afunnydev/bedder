import { createStructuredSelector } from 'reselect';
import {
  changeFacebookSubmittingAction,
  changeFacebookResultAction,
  changeFacebookErrorAction,
  changeFacebookOauthResultAction,
  submitFacebookAction,
  successFacebookAction,
} from './actions';
import {
  makeSelectFacebookSubmitting,
  makeSelectFacebookResult,
  makeSelectFacebookError,
  makeSelectFacebookOauthResult,
} from './selectors'; // { makeSelectSignUpPropainer,

const mapStateToProps = createStructuredSelector({
  // signuppropainer: makeSelectSignUpPropainer(),

  facebookSubmitting: makeSelectFacebookSubmitting(),
  facebookResult: makeSelectFacebookResult(),
  facebookError: makeSelectFacebookError(),
  facebookOauthResult: makeSelectFacebookOauthResult(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,

    submitFacebook: evt => {
      dispatch(submitFacebookAction(evt));
    },
    successFacebook: evt => {
      dispatch(successFacebookAction(evt));
    },
    onChangeFacebookSubmitting: evt => {
      dispatch(changeFacebookSubmittingAction(evt));
    },
    onChangeFacebookResult: evt => {
      dispatch(changeFacebookResultAction(evt));
    },
    onChangeFacebookError: evt => {
      dispatch(changeFacebookErrorAction(evt));
    },
    onChangeFacebookOauthResult: evt => {
      dispatch(changeFacebookOauthResultAction(evt));
    },
  };
}

export { mapStateToProps, mapDispatchToProps };
