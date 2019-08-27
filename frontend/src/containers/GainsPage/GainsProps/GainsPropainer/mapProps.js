import { createStructuredSelector } from 'reselect';
import {
  changeGainsSubmittingAction,
  changeGainsResultAction,
  changeGainsErrorAction,
  changeGains1Action,
  changeGains2Action,
  changeGains3Action,
  submitAction,
  processAction,
  action1Action,
  action2Action,
  action3Action,
} from './actions';
import {
  makeSelectGainsSubmitting,
  makeSelectGainsResult,
  makeSelectGainsError,
  makeSelectGains1,
  makeSelectGains2,
  makeSelectGains3,
} from './selectors'; // { makeSelectGainsPropainer,

const mapStateToProps = createStructuredSelector({
  // gainspropainer: makeSelectGainsPropainer(),

  gainsSubmitting: makeSelectGainsSubmitting(),
  gainsResult: makeSelectGainsResult(),
  gainsError: makeSelectGainsError(),
  gains1: makeSelectGains1(),
  gains2: makeSelectGains2(),
  gains3: makeSelectGains3(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,

    submit: (evt) => {
      dispatch(submitAction(evt));
    },
    process: (evt) => {
      dispatch(processAction(evt));
    },
    action1: (evt) => {
      dispatch(action1Action(evt));
    },
    action2: (evt) => {
      dispatch(action2Action(evt));
    },
    action3: (evt) => {
      dispatch(action3Action(evt));
    },
    onChangeGainsSubmitting: (evt) => {
      dispatch(changeGainsSubmittingAction(evt));
    },
    onChangeGainsResult: (evt) => {
      dispatch(changeGainsResultAction(evt));
    },
    onChangeGainsError: (evt) => {
      dispatch(changeGainsErrorAction(evt));
    },
    onChangeGains1: (evt) => {
      dispatch(changeGains1Action(evt));
    },
    onChangeGains2: (evt) => {
      dispatch(changeGains2Action(evt));
    },
    onChangeGains3: (evt) => {
      dispatch(changeGains3Action(evt));
    },
  };
}

export { mapStateToProps, mapDispatchToProps };
