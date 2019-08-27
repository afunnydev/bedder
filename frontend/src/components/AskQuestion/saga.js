// import { take, call, put, select } from 'redux-saga/effects';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import Bedder from 'bedder/bedder';
import BedderConfig from 'bedder/bedderConfig';

import request from 'utils/request';

import { SUBMIT } from './AskQuestionPropainer/constants';
import { makeSelectMessage, makeSelectSubject, makeSelectType } from './AskQuestionPropainer/selectors';
import { changeSubmitErrorAction, changeSubmitResultAction } from './AskQuestionPropainer/actions';

export function* postST(action) {
  const subject = yield select(makeSelectSubject());
  const message = yield select(makeSelectMessage());
  // const type = yield select(makeSelectType());
  const payload = yield select(makeSelectType());
  // console.log('action', action);

  const requestURL = `${BedderConfig.getApiUrl()}/supportTicket/new?XDEBUG_SESSION_START=phpstorm`;

  try {
    const res = yield call(request, requestURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': Bedder.getHeaderToken(),
      },
      body: JSON.stringify({
        subject: subject,
        message: message,
        payload: payload,
        type: payload.ticketType,
      })
    });

    yield put(changeSubmitResultAction(res));
  } catch (err) {
    yield put(changeSubmitErrorAction(err));
  }
}


// Individual exports for testing
export default function* defaultSaga() {
  // yield takeLatest(SUBMIT, makeSubmit);
  // yield takeLatest(SUBMITGET, makeGetBusiness);
  yield takeLatest(SUBMIT, postST);
}
