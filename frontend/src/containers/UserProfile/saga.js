import { call, put, select, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';

import Bedder from 'bedder/bedder';
import BedderConfig from 'bedder/bedderConfig';

import { 
  SUBMIT,
  SUBMITSAVE ,
} from './UserProfileRedux/constants';
import {
  changeSubmitErrorAction,
  changeSubmitResultAction,
  processAction,
} from './UserProfileRedux/actions';
import {
  makeSelectAbout, 
  makeSelectEmail,
  makeSelectFirstname,
  makeSelectLastname,
  makeSelectPhotos,
  makeSelectNewPassword,
} from './UserProfileRedux/selectors';
// import {
//   changeSubmitSaveErrorAction,
//   changeSubmitSaveResultAction,
// } from './UserProfileProps/UserProfilePropainerTwo/actions';

export function* makeSubmitSave() {
  const firstname = yield select(makeSelectFirstname());
  const lastname = yield select(makeSelectLastname());
  const about = yield select(makeSelectAbout());
  const email = yield select(makeSelectEmail());
  const photos = yield select(makeSelectPhotos());
  const newPassword = yield select(makeSelectNewPassword());

  const requestURL = `${BedderConfig.getApiUrl()}/user?XDEBUG_SESSION_START=phpstorm`;

  try {
    const res = yield call(request, requestURL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': Bedder.getHeaderToken(),
      },
      body: JSON.stringify({
        firstname: firstname,
        lastname: lastname,
        about: about,
        email: email,
        photos: JSON.stringify(photos),
        newPassword: newPassword,
      }),
    });

    console.log(res);
    // yield put(changeSubmitSaveResultAction(res));
  } catch (err) {
    console.log(err);
    // yield put(changeSubmitSaveErrorAction(err));
  }
}
//
export function* getProfile() {

  const requestURL = `${BedderConfig.getApiUrl()}/user?XDEBUG_SESSION_START=phpstorm`;

  try {
    const res = yield call(request, requestURL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': Bedder.getHeaderToken(),
      },
    });

    yield put(changeSubmitResultAction(res));
    yield put(processAction(res));
  } catch (err) {
    yield put(changeSubmitErrorAction(err));
  }
}


// Individual exports for testing
export default function* defaultSaga() {
  yield takeLatest(SUBMITSAVE, makeSubmitSave);
  yield takeLatest(SUBMIT, getProfile);
}
