import { call, put, select, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';

import BedderConfig from 'bedder/bedderConfig';

import { SUBMITFACEBOOK } from './AuthPagePropainer/constants';
import { changeFacebookResultAction, changeFacebookErrorAction } from './AuthPagePropainer/actions';
import { makeSelectFacebookOauthResult } from './AuthPagePropainer/selectors';

export function* submitFacebookToken() {
  
  const facebookPayload = yield select(makeSelectFacebookOauthResult());
  const requestURL = `${BedderConfig.getApiUrl()}/user/facebook?XDEBUG_SESSION_START=phpstorm`;

  try {
    const res = yield call(request, requestURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        facebookPayload
      })
    });

    yield put(changeFacebookResultAction(res));
  } catch (err) {
    yield put(changeFacebookErrorAction(err));
  }
}

// Individual exports for testing
export default function* defaultSaga() {
  yield takeLatest(SUBMITFACEBOOK, submitFacebookToken);
}
