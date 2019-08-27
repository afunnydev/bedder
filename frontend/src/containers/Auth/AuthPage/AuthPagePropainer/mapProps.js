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
} from './selectors'; //{ makeSelectAuthPagePropainer,
import { createStructuredSelector } from 'reselect';

const mapStateToProps = createStructuredSelector({
  //authpagepropainer: makeSelectAuthPagePropainer(),

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
