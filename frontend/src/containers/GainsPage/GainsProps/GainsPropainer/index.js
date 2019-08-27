/**
 *
 * GainsPropainer
 * ??????
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectReducer from 'utils/injectReducer';
import {
  makeSelectGainsPropainer,
  makeSelectGainsSubmitting,
  makeSelectGainsResult,
  makeSelectGainsError,
  makeSelectGains1,
  makeSelectGains2,
  makeSelectGains3,
} from './selectors';
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
  CHANGE_GAINSSUBMITTING,
  CHANGE_GAINSRESULT,
  CHANGE_GAINSERROR,
  CHANGE_GAINS1,
  CHANGE_GAINS2,
  CHANGE_GAINS3,
  SUBMIT,
  PROCESS,
  ACTION1,
  ACTION2,
  ACTION3,
} from './constants';

import { mapStateToProps, mapDispatchToProps } from './mapProps';

import reducer from './reducer';

/* eslint-disable react/prefer-stateless-function */
export class GainsPropainer extends React.Component {
  render() {
    return (
      /* <div style={{display: 'none'}}>

GainsSubmitting: <input onChange={this.props.onChangeGainsSubmitting} value={this.props.gainsSubmitting} />
GainsResult: <input onChange={this.props.onChangeGainsResult} value={this.props.gainsResult} />
GainsError: <input onChange={this.props.onChangeGainsError} value={this.props.gainsError} />
Gains1: <input onChange={this.props.onChangeGains1} value={this.props.gains1} />
Gains2: <input onChange={this.props.onChangeGains2} value={this.props.gains2} />
Gains3: <input onChange={this.props.onChangeGains3} value={this.props.gains3} />

Submit: <button onClick={this.props.submit}>TRY</button>
Process: <button onClick={this.props.process}>TRY</button>
Action1: <button onClick={this.props.action1}>TRY</button>
Action2: <button onClick={this.props.action2}>TRY</button>
Action3: <button onClick={this.props.action3}>TRY</button>
      </div> */
      <React.Fragment>{this.props.children}</React.Fragment>
    );
  }
}

GainsPropainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'gainsPage', reducer });

export default compose(
  withReducer,
  withConnect,
)(GainsPropainer);

export { withConnect };
