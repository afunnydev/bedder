import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import saga from './saga';

import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import BedderValidator from 'bedder/bedderValidator';
import { Validation } from 'react-validation-framework';

import AskQuestionPropainer, {withConnect as withConnectAskQuestion} from './AskQuestionPropainer';
import ErrorResult from 'components/ErrorResult';
import ErrorNetwork from 'components/ErrorNetwork';
import MessageResult from 'components/MessageResult';

/* eslint-disable react/prefer-stateless-function */
class AskQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      refresh: false,
      success: false,
    };
    this.vRefs = BedderValidator.makeRefs(BedderValidator.getAskQuestion());
    this.sendST = this.sendST.bind(this);
    this.close = this.close.bind(this);
  }

  sendST() {
    if(BedderValidator.validate(this.vRefs)) {
      this.props.onChangeType({
        businessId: this.props.businessId,
        ticketType: 1,
      });
      this.props.submit();
    }
  }

  clean() {
    this.props.onChangeSubjectVal(' ');
    this.props.onChangeMessageVal(' ');
    this.props.onChangeSubmitError(null);
    this.props.onChangeSubmitResult(null);
    this.props.onChangeType({});
  }

  close() {
    this.clean();
    this.setState({refresh: !this.state.refresh, success: false});
    this.props.closeFn();
  }

  componentDidUpdate(prevProps) {
    if(prevProps.submitResult != this.props.submitResult) {
      if(this.props.submitResult && this.props.submitResult.result && this.props.submitResult.result.id && this.props.submitResult.result.id > 0) {
        this.clean();
        this.setState({success: true});
      }
    }
  }

  render() {
    const vs = BedderValidator.getValidators();

    return (
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        maxWidth="xs"
        open={this.props.isOpen}
        // onClose={this.handleClose}
        // value={this.state.value}
        //{...other}
      >
        <AskQuestionPropainer />
        <DialogTitle>
          Ask A Question
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            We will follow up by email in 48-72 hours.
          </DialogContentText>
        </DialogContent>
        <DialogContent>

          <div style={{ margin: 10 }}>
            <ErrorResult result={this.props.submitResult} />
            <ErrorNetwork error={this.props.submitError} />
          </div>
          <Grid container>
            <Grid item xs={12}>
              Subject
            </Grid>
            <Grid item xs={12}>
              <Validation
                componentTag="TextField"
                ref={this.vRefs.subject}
                onChangeCallback="onChange"
                validators={[vs.notEmpty]}
                margin="normal"
              >
                <TextField
                  fullWidth
                  name="subject"
                  onChange={this.props.onChangeSubject}
                  value={this.props.subject}
                  margin="normal"
                  style={{ marginBottom: 20 }}
                />
              </Validation>
            </Grid>
            <Grid item xs={12}>
              Message
            </Grid>
            <Grid item xs={12}>
              <Validation
                componentTag="TextField"
                ref={this.vRefs.message}
                onChangeCallback="onChange"
                validators={[vs.notEmpty]}
              >
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  name="message"
                  onChange={this.props.onChangeMessage}
                  value={this.props.message}
                />
              </Validation>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          {this.state.success && (
            <MessageResult message="Message sent!" />
          )}
          <Button disabled={this.props.submitting} onClick={this.close} color="primary">
            {this.state.success && ('OK')}
            {!this.state.success && ('Cancel')}
          </Button>
          {this.state.success || (
            <Button disabled={this.props.submitting} onClick={this.sendST} color="primary">
              Send
            </Button>
          )}
        </DialogActions>
      </Dialog>
    );
  }
}

AskQuestion.propTypes = {};

const withSaga = injectSaga({ key: 'askQuestion', saga });
const withConnect = connect(
  null,
  null,
);

export default compose(withConnect, withSaga, withConnectAskQuestion)(AskQuestion);
