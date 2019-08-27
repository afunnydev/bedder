// import { take, call, put, select } from 'redux-saga/effects';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import Bedder from 'bedder/bedder';
import BedderConfig from 'bedder/bedderConfig';
// import { GETBOOKINGSUBMIT } from '../ReservationsProps/ReservationsPropainerOne/constants';
// import {
//   changeGetReservationsErrorAction,
//   changeGetReservationsResultAction,
// } from '../ReservationsProps/ReservationsPropainerOne/actions';
//
// // import {
// //   SUBMITGET,
// // } from '../ReservationsProps/ReservationsPropainerOne/constants';
// // import {
// //   changeGetResultModelAction,
// //   changeGetErrorAction,
// // } from '../ReservationsProps/ReservationsPropainerOne/actions';
// //
import request from 'utils/request';
// // import { makeSelectModelId } from '../ReservationsProps/ReservationsPropainerOne/selectors';
// // import { MAKEBOOKING } from '../ReservationsProps/ReservationsPropainerTwo/constants';
// // import { makeSelectFrom, makeSelectTo } from 'containers/SearchBar/SearchBarRedux/selectors';
// // import { changeBookErrorAction, changeBookResultAction } from '../ReservationsProps/ReservationsPropainerTwo/actions';
//

import {
  ACCEPTAUTOBOOKING,
  ACCEPTAUTOOFFBOOKING,
  ACCEPTBOOKING,
  DECLINEBOOKING,
  GETRESERVATIONSSUBMIT,
} from '../ReservationsProps/ReservationsPropainerOne/constants';
import {
  changeAcceptAutoBookingErrorAction,
  changeAcceptAutoBookingResultAction,
  changeAcceptAutoOffBookingErrorAction,
  changeAcceptAutoOffBookingResultAction,
  changeAcceptBookingErrorAction,
  changeAcceptBookingResultAction, changeDeclineBookingErrorAction, changeDeclineBookingResultAction,
  changeGetReservationsErrorAction,
  changeGetReservationsResultAction,
  getReservationsSubmitAction,
} from '../ReservationsProps/ReservationsPropainerOne/actions';


export function* makeGetReservations(action) {
//   const roomId = action.roomId;
//   const numUnits = action.numUnits;
//   const from = yield select(makeSelectFrom());
//   const to = yield select(makeSelectTo());
//   const payload = action.payload;
//   console.log('action', action);
//
//   console.log('wtf');
  const requestURL = `${BedderConfig.getApiUrl()}/booking/listOwner?XDEBUG_SESSION_START=phpstorm`;
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
    yield put(changeGetReservationsResultAction(res));
  } catch (err) {
    // console.log('fking err', err)
    var error = Object.assign({}, err);
    // console.log('fking error', error)
    yield put(changeGetReservationsErrorAction(error));
  }
}

export function* makeAcceptAutoBooking(action) {
  const bookingId = action.acceptAutoBooking;
  // console.log('action', action);

  const requestURL = `${BedderConfig.getApiUrl()}/booking/${bookingId}/acceptAutomatically?XDEBUG_SESSION_START=phpstorm`;

  try {
    const res = yield call(request, requestURL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': Bedder.getHeaderToken(),
      },
      // body: JSON.stringify({

      // })
    });

    yield put(changeAcceptAutoBookingResultAction(res, bookingId));
    yield put(getReservationsSubmitAction());
  } catch (err) {
    yield put(changeAcceptAutoBookingErrorAction(err, bookingId));
  }
}

export function* makeAcceptAutoOffBooking(action) {
  const bookingId = action.acceptAutoOffBooking;
  // console.log('action', action);

  const requestURL = `${BedderConfig.getApiUrl()}/booking/${bookingId}/acceptOffAutomatically?XDEBUG_SESSION_START=phpstorm`;

  try {
    const res = yield call(request, requestURL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': Bedder.getHeaderToken(),
      },
      // body: JSON.stringify({

      // })
    });

    yield put(changeAcceptAutoOffBookingResultAction(res, bookingId));
    yield put(getReservationsSubmitAction());
  } catch (err) {
    yield put(changeAcceptAutoOffBookingErrorAction(err, bookingId));
  }
}

export function* makeAcceptBooking(action) {
  const bookingId = action.acceptBooking;
  // console.log('action', action);

  const requestURL = `${BedderConfig.getApiUrl()}/booking/${bookingId}/accept?XDEBUG_SESSION_START=phpstorm`;

  try {
    const res = yield call(request, requestURL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': Bedder.getHeaderToken(),
      },
      // body: JSON.stringify({

      // })
    });

    yield put(changeAcceptBookingResultAction(res, bookingId));
    yield put(getReservationsSubmitAction());
  } catch (err) {
    yield put(changeAcceptBookingErrorAction(err, bookingId));
  }
}

export function* makeDeclineBooking(action) {
  const bookingId = action.declineBooking;
  // console.log('action', action);

  const requestURL = `${BedderConfig.getApiUrl()}/booking/${bookingId}/decline?XDEBUG_SESSION_START=phpstorm`;

  try {
    const res = yield call(request, requestURL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': Bedder.getHeaderToken(),
      },
      // body: JSON.stringify({

      // })
    });

    yield put(changeDeclineBookingResultAction(res, bookingId));
    yield put(getReservationsSubmitAction());
  } catch (err) {
    yield put(changeDeclineBookingErrorAction(err, bookingId));
  }
}


// Individual exports for testing

export default function* defaultSaga() {
  // yield takeLatest(SUBMIT, makeSubmit);
  // yield takeLatest(SUBMITGET, makeGetBusiness);
  // yield takeLatest(GETBOOKINGSUBMIT, makeGetReservations);
  yield takeLatest(GETRESERVATIONSSUBMIT, makeGetReservations);
  yield takeLatest(ACCEPTBOOKING, makeAcceptBooking);
  yield takeLatest(ACCEPTAUTOBOOKING, makeAcceptAutoBooking);
  yield takeLatest(ACCEPTAUTOOFFBOOKING, makeAcceptAutoOffBooking);
  yield takeLatest(DECLINEBOOKING, makeDeclineBooking);
}
