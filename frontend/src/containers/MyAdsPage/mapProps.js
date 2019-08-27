import {
  changeResultAction,
  changeErrorAction,
  changeSubmittingAction,
  changeDataAction,
  submitAction,
} from './actions';
import {
  makeSelectResult,
  makeSelectError,
  makeSelectSubmitting,
  makeSelectData,
} from './selectors';
import { createStructuredSelector } from 'reselect';

const mapStateToProps = createStructuredSelector({
  result: makeSelectResult(),
  error: makeSelectError(),
  submitting: makeSelectSubmitting(),
  data: makeSelectData(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,

    submit: () => {
      dispatch(submitAction());
    },
    onChangeResult: evt => {
      dispatch(changeResultAction(evt.target.value));
    },
    onChangeError: evt => {
      dispatch(changeErrorAction(evt.target.value));
    },
    onChangeSubmitting: evt => {
      dispatch(changeSubmittingAction(evt.target.value));
    },
    onChangeData: evt => {
      dispatch(changeDataAction(evt.target.value));
    },
  };
}

export { mapStateToProps, mapDispatchToProps };
