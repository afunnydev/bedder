import { createStructuredSelector } from 'reselect';
import {
  changeLocationAction,
  changeFromAction,
  changeToAction,
  changeNumPeopleAction,
  changeNumBedAction,
  changeLatAction, 
  changeLonAction,
} from './actions';
import {
  makeSelectLocation,
  makeSelectFrom,
  makeSelectTo,
  makeSelectNumPeople,
  makeSelectNumBed, 
  makeSelectLat, 
  makeSelectLon,
} from './selectors';

const mapStateToProps = createStructuredSelector({
  locationText: makeSelectLocation(),
  from: makeSelectFrom(),
  to: makeSelectTo(),
  maxPersons: makeSelectNumPeople(),
  numBed: makeSelectNumBed(),
  lat: makeSelectLat(),
  lon: makeSelectLon(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onChangeLocation: (evt) => {
      dispatch(changeLocationAction(evt.target.value));
    },
    onChangeLat: (evt) => {
      dispatch(changeLatAction(evt));
    },
    onChangeLon: (evt) => {
      dispatch(changeLonAction(evt));
    },
    onChangeLocationByHand: (evt) => {
      dispatch(changeLocationAction(evt));
    },
    onChangeFrom: (evt) => {
      dispatch(changeFromAction(evt.target.value));
    },
    onChangeTo: (evt) => {
      dispatch(changeToAction(evt.target.value));
    },
    onChangeFromVal: (evt) => {
      dispatch(changeFromAction(evt));
    },
    onChangeToVal: (evt) => {
      dispatch(changeToAction(evt));
    },
    onChangeNumPeople: (evt) => {
      dispatch(changeNumPeopleAction(evt.target.value));
    },
    onChangeNumBed: (evt) => {
      dispatch(changeNumBedAction(evt.target.value));
    },
  };
}

export { mapStateToProps, mapDispatchToProps };
