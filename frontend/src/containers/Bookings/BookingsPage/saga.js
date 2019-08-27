// import { take, call, put, select } from 'redux-saga/effects';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import Bedder from 'bedder/bedder';
import BedderConfig from 'bedder/bedderConfig';
import { GETBOOKINGSUBMIT } from '../BookingsProps/BookingsPropainerOne/constants';
import {
  changeGetBookingsErrorAction,
  changeGetBookingsResultAction,
} from '../BookingsProps/BookingsPropainerOne/actions';

// import {
//   SUBMITGET,
// } from '../BookingsProps/BookingsPropainerOne/constants';
// import {
//   changeGetResultModelAction,
//   changeGetErrorAction,
// } from '../BookingsProps/BookingsPropainerOne/actions';
//
import request from 'utils/request';
// import { makeSelectModelId } from '../BookingsProps/BookingsPropainerOne/selectors';
// import { MAKEBOOKING } from '../BookingsProps/BookingsPropainerTwo/constants';
// import { makeSelectFrom, makeSelectTo } from 'containers/SearchBar/SearchBarRedux/selectors';
// import { changeBookErrorAction, changeBookResultAction } from '../BookingsProps/BookingsPropainerTwo/actions';

export function* makeGetBookings(action) {
//   const roomId = action.roomId;
//   const numUnits = action.numUnits;
//   const from = yield select(makeSelectFrom());
//   const to = yield select(makeSelectTo());
//   const payload = action.payload;
//   console.log('action', action);
//
  // console.log('wtf');
  const requestURL = `${BedderConfig.getApiUrl()}/booking/list?XDEBUG_SESSION_START=phpstorm`;
//
  try {
    const res = yield call(request, requestURL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': Bedder.getHeaderToken(),
      },
//       body: JSON.stringify({
//         from: from,
//         to: to,
//         businessUnitId: roomId,
//         numUnits: numUnits,
//         payload: payload,
//       })
    });
//
    yield put(changeGetBookingsResultAction(res));
  } catch (err) {
    yield put(changeGetBookingsErrorAction(err));
  }
}

// export function* makeGetBusiness(action) {
//   const modelId = yield select(makeSelectModelId());
//   // console.log('action', action);
//
//   const requestURL = `${BedderConfig.getApiUrl()}/business/${modelId}?XDEBUG_SESSION_START=phpstorm`;
//
//   try {
//     const res = yield call(request, requestURL, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': Bedder.getHeaderToken(),
//       },
//       // body: JSON.stringify({
//
//       // })
//     });
//
//     yield put(changeGetResultModelAction(res));
//   } catch (err) {
//     yield put(changeGetErrorAction(err));
//   }
// }


// Individual exports for testing
export default function* defaultSaga() {
  // yield takeLatest(SUBMIT, makeSubmit);
  // yield takeLatest(SUBMITGET, makeGetBusiness);
  yield takeLatest(GETBOOKINGSUBMIT, makeGetBookings);
  // yield takeLatest(MAKEBOOKING, makeBooking);
}
