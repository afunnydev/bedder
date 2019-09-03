import { call, put, select, takeLatest } from 'redux-saga/effects';
import Bedder from 'bedder/bedder';
import BedderConfig from 'bedder/bedderConfig';
import request from 'utils/request';
import formatDate from 'utils/formatDate';

import { SUBMIT } from './constants';
import { changeSubmitResultAction, changeSubmitErrorAction } from './actions';

import {
  makeSelectFilterPrice,
  makeSelectFilter1Star,
  makeSelectFilter2Star,
  makeSelectFilter3Star,
  makeSelectFilter4Star,
  makeSelectFilter5Star,
  makeSelectFilterTypes,
  makeSelectSortBy,
} from './selectors';

import {
  makeSelectLocation,
  makeSelectNumBed,
  makeSelectNumPeople,
  makeSelectTo,
  makeSelectFrom,
  makeSelectLon,
  makeSelectLat,
} from '../../components/SearchBar/SearchBarRedux/selectors';

export function* makeSearch(action) {
  // console.log('search action', action)
  const pageNum = action.page;
  const lat = yield select(makeSelectLat());
  const lon = yield select(makeSelectLon());
  // const location = yield select(makeSelectLocation());
  const location = yield select(makeSelectLocation());
  const from = yield select(makeSelectFrom());
  const to = yield select(makeSelectTo());
  const maxPersons = yield select(makeSelectNumPeople());
  const numBed = yield select(makeSelectNumBed());

  const filterPrice = yield select(makeSelectFilterPrice());
  const filter1Star = yield select(makeSelectFilter1Star());
  const filter2Star = yield select(makeSelectFilter2Star());
  const filter3Star = yield select(makeSelectFilter3Star());
  const filter4Star = yield select(makeSelectFilter4Star());
  const filter5Star = yield select(makeSelectFilter5Star());
  const filterTypes = yield select(makeSelectFilterTypes());

  const sortBy = yield select(makeSelectSortBy());

  const requestURL = `${BedderConfig.getApiUrl()}/booking/search`;

  let headers = {
    'Content-Type': 'application/json',
  };

  if (Bedder.getUser()) {
    headers.Authorization = Bedder.getHeaderToken();
  }

  try {
    const res = yield call(request, requestURL, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        location,
        lat,
        lon,
        from: formatDate(from),
        to: formatDate(to),
        minPersons: maxPersons,
        numBed,
        pageNum,
        filterPrice,
        filter1Star,
        filter2Star,
        filter3Star,
        filter4Star,
        filter5Star,
        // filterTypes,
        sortBy,
      }),
    });

    yield put(changeSubmitResultAction(res));
  } catch (err) {
    yield put(changeSubmitErrorAction(err));
  }
}
// Individual exports for testing
export default function* defaultSaga() {
  yield takeLatest(SUBMIT, makeSearch);
}
