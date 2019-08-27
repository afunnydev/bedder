/*
 *
 * HomePage reducer
 *
 */

import { fromJS } from 'immutable';
import BedderConfig from 'bedder/bedderConfig';
import {
  SUBMIT,
  CHANGE_NUM_PEOPLE,
  CHANGE_NUM_BED,
  CHANGE_LOCATION,
  CHANGE_TO,
  CHANGE_FROM,
  SUBMIT_RESULT,
  SUBMIT_ERROR,
  CHANGE_LON,
  CHANGE_LAT,
  SET_MAP_VIEW,
  SET_GRID_VIEW,
  SET_SORT_BY_ACTIVE,
  SET_FILTER_BY_ACTIVE,
  CHANGE_FILTER_PRICE,
  HOMEPAGE_INIT,
  CHANGE_FILTER_1_STAR,
  CHANGE_FILTER_2_STAR,
  CHANGE_FILTER_3_STAR,
  CHANGE_FILTER_4_STAR,
  CHANGE_FILTER_5_STAR,
  CHANGE_FILTER_TYPES,
  CHANGE_SORT_BY,
} from './constants';

const defaultFilterPrice = [0, 299];
const defaultFilterTypes = BedderConfig.getFilterPropertyTypes();
// console.log('defaultFilterPrice',defaultFilterPrice);
export const initialState = fromJS({
  location: 'fockyeah!',
  from: '2018-07-31',
  to: '2018-08-02',
  maxPersons: 2,
  numBed: 1,
  submitting: false,
  submitResult: false,
  submitError: false,
  lat: 49.839683,
  lon: 24.029717000000005,
  isMapView: false,
  gridConfig: 8,
  isFilterByActive: true,
  filterPrice: defaultFilterPrice,
  filter1Star: true,
  filter2Star: true,
  filter3Star: true,
  filter4Star: true,
  filter5Star: true,
  filterTypes: defaultFilterTypes,
  sortBy: false,
});

function homePageReducer(state = initialState, action) {
  // console.log('homePageReducer action', action);
  switch (action.type) {
    case CHANGE_SORT_BY:
      if (state.get('sortBy') === action.sortBy)
        return state.set('sortBy', false);
      return state.set('sortBy', action.sortBy);
    case CHANGE_FILTER_TYPES:
      return state.set(
        'filterTypes',
        Object.assign([...state.get('filterTypes')], {
          [action.i]: Object.assign({}, state.get('filterTypes')[action.i], {
            isActive: !state.get('filterTypes')[action.i].isActive,
          }),
        }),
      );
    case CHANGE_FILTER_1_STAR:
      return state.set('filter1Star', !state.get('filter1Star'));
    case CHANGE_FILTER_2_STAR:
      return state.set('filter2Star', !state.get('filter2Star'));
    case CHANGE_FILTER_3_STAR:
      return state.set('filter3Star', !state.get('filter3Star'));
    case CHANGE_FILTER_4_STAR:
      return state.set('filter4Star', !state.get('filter4Star'));
    case CHANGE_FILTER_5_STAR:
      return state.set('filter5Star', !state.get('filter5Star'));
    case HOMEPAGE_INIT:
      return state
        .set('filterPrice', defaultFilterPrice)
        .set('filterTypes', defaultFilterTypes);
    case CHANGE_FILTER_PRICE:
      return state.set('filterPrice', action.range);
    case SET_SORT_BY_ACTIVE:
      return state.set('isFilterByActive', false);
    case SET_FILTER_BY_ACTIVE:
      return state.set('isFilterByActive', true);
    case SET_GRID_VIEW:
      return state.set('isMapView', false).set('gridConfig', 8);
    case SET_MAP_VIEW:
      return state.set('isMapView', true).set('gridConfig', 4);
    case CHANGE_NUM_PEOPLE:
      return state.set('maxPersons', action.maxPersons);
    case CHANGE_NUM_BED:
      return state.set('numBed', action.numBed);
    case CHANGE_LOCATION:
      return state.set('location', action.location);
    case CHANGE_TO:
      return state.set('to', action.to);
    case CHANGE_FROM:
      return state.set('from', action.from);
    case CHANGE_LON:
      return state.set('lon', action.lon);
    case CHANGE_LAT:
      return state.set('lat', action.lat);
    case SUBMIT:
      return state.set('submitting', true);
    case SUBMIT_RESULT:
      return state
        .set('submitResult', action.result)
        .set('submitError', false)
        .set('submitting', false);
    case SUBMIT_ERROR:
      return state
        .set('submitError', action.error)
        .set('submitResult', null)
        .set('submitting', false);
    default:
      return state;
  }
}

export default homePageReducer;
