import {
  call, put, select, takeLatest,
} from 'redux-saga/effects';
import Bedder from 'bedder/bedder';
import BedderConfig from 'bedder/bedderConfig';

import request from 'utils/request';
import {
  SUBMIT,
} from '../GainsProps/GainsPropainer/constants';
import {
  changeGainsResultAction,
  changeGainsErrorAction,
} from '../GainsProps/GainsPropainer/actions';


export function* getGains(action) {
  const requestURL = BedderConfig.prepareUrl('/gains');

  try {
    const res = yield call(request, requestURL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: Bedder.getHeaderToken(),
      },
      // body: JSON.stringify({

      // })
    });

    yield put(changeGainsResultAction(res));
  } catch (err) {
    yield put(changeGainsErrorAction(err));
  }
}


// Individual exports for testing
export default function* defaultSaga() {
  // yield takeLatest(SUBMIT, makeSubmit);
  yield takeLatest(SUBMIT, getGains);
}
