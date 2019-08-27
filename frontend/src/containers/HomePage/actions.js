/*
 *
 * HomePage actions
 *
 */

import {
  HOMEPAGE_INIT,
  CHANGE_FROM,
  CHANGE_LOCATION,
  CHANGE_NUM_BED,
  CHANGE_NUM_PEOPLE,
  CHANGE_TO,
  SUBMIT,
  SUBMIT_ERROR,
  SUBMIT_RESULT,
  CHANGE_LAT,
  CHANGE_LON,
  SET_GRID_VIEW,
  SET_MAP_VIEW,
  SET_FILTER_BY_ACTIVE,
  SET_SORT_BY_ACTIVE,
  CHANGE_FILTER_PRICE_FROM,
  CHANGE_FILTER_PRICE_TO,
  CHANGE_FILTER_PRICE,
  CHANGE_FILTER_1_STAR,
  CHANGE_FILTER_2_STAR,
  CHANGE_FILTER_3_STAR,
  CHANGE_FILTER_4_STAR,
  CHANGE_FILTER_5_STAR,
  CHANGE_FILTER_TYPES,
  CHANGE_SORT_BY,
} from './constants';

export function homepageInitAction() {
  return {
    type: HOMEPAGE_INIT,
  };
}

export function changeFromAction(from) {
  return {
    type: CHANGE_FROM,
    from,
  };
}

export function changeToAction(to) {
  return {
    type: CHANGE_TO,
    to,
  };
}

export function changeLocationAction(location) {
  return {
    type: CHANGE_LOCATION,
    location,
  };
}

export function changeNumBedAction(numBed) {
  return {
    type: CHANGE_NUM_BED,
    numBed,
  };
}

export function changeNumPeopleAction(maxPersons) {
  return {
    type: CHANGE_NUM_PEOPLE,
    maxPersons,
  };
}

export function changeLatAction(lat) {
  return {
    type: CHANGE_LAT,
    lat,
  };
}

export function changeLonAction(lon) {
  return {
    type: CHANGE_LON,
    lon,
  };
}

export function submitAction(page) {
  return {
    type: SUBMIT,
    page,
  };
}

export function changeSubmitErrorAction(error) {
  return {
    type: SUBMIT_ERROR,
    error,
  };
}

export function changeSubmitResultAction(result) {
  return {
    type: SUBMIT_RESULT,
    result,
  };
}

export function setMapViewAction() {
  return {
    type: SET_MAP_VIEW,
  };
}

export function setGridViewAction() {
  return {
    type: SET_GRID_VIEW,
  };
}

export function setFilterByActiveAction() {
  return {
    type: SET_FILTER_BY_ACTIVE,
  };
}

export function setSortByActiveAction() {
  return {
    type: SET_SORT_BY_ACTIVE,
  };
}

export function changeFilterPriceAction(range) {
  return {
    type: CHANGE_FILTER_PRICE,
    range,
  };
}

export function changeFilterPriceFromAction(from) {
  return {
    type: CHANGE_FILTER_PRICE_FROM,
    from,
  };
}

export function changeFilterPriceToAction(to) {
  return {
    type: CHANGE_FILTER_PRICE_TO,
    to,
  };
}

export function changeFilter1StarAction() {
  return {
    type: CHANGE_FILTER_1_STAR,
  };
}

export function changeFilter2StarAction() {
  return {
    type: CHANGE_FILTER_2_STAR,
  };
}

export function changeFilter3StarAction() {
  return {
    type: CHANGE_FILTER_3_STAR,
  };
}

export function changeFilter4StarAction() {
  return {
    type: CHANGE_FILTER_4_STAR,
  };
}

export function changeFilter5StarAction() {
  return {
    type: CHANGE_FILTER_5_STAR,
  };
}

export function changeFilterTypesAction(i) {
  return {
    type: CHANGE_FILTER_TYPES,
    i,
  };
}

export function changeSortByAction(sortBy) {
  return {
    type: CHANGE_SORT_BY,
    sortBy,
  };
}
