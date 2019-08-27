import React from 'react';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';

import { Validation, fieldValidatorCore } from 'react-validation-framework';
import MuiPhoneNumber from 'material-ui-phone-number';
import { withSnackbar } from 'notistack';

import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import FormHelperText from '@material-ui/core/FormHelperText';

import CheckCircleIcon from '@material-ui/icons/CheckCircle';

import BackButton from 'components/BackButton';
import MessageError from 'components/MessageError';
import AcceptViaSms from 'components/AcceptViaSms';

import BedderValidator from 'bedder/bedderValidator';
import Bedder from 'bedder/bedder';

import PageTitle from 'components/styles/PageTitle';

import AddPhoneButton from './AddPhoneButton';
import VerifyPhoneButton from './VerifyPhoneButton';
import AddBusinessButton from './AddBusinessButton';

export class BusinessAddPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      isOwner: false,
      ownerEmail: '',
      smsNotification: false,
      ownerPhone: '',
      valid: true,
      phoneValidated: false,
      verificationCode: '',
      needsVerification: false,
    };
  }

  saveToState = e => this.setState({ [e.target.name]: e.target.value });
  handleChange = (name, value) => this.setState({ [name]: value });
  handlePhoneChange = value => this.setState({ ownerPhone: value });
  handleSmsChange = value => this.setState({ smsNotification: value })

  handleSubmit = async (submitfn) => {
    const validateField = fieldValidatorCore.checkGroup('addBusiness');
    if (!validateField.isValid) {
      return this.setState({ valid: false });
    }
    this.setState({ valid: true });
    if (this.state.smsNotification && !this.state.phoneValidated) {
      return this.props.enqueueSnackbar('You need to verify the phone number first if you want to receive SMS notifications.', { variant: 'error' });
    }
    const res = await submitfn();
    if (res && res.data && res.data.addBusiness) {
      const { status, id, name } = res.data.addBusiness;
      if (id > 0) {
        if (status === 1) {
          this.props.enqueueSnackbar(`${name} was just created. Please create and confirm the owner's account before completing this business' profile.`, { variant: 'info' });
        } else if (status === 2) {
          this.props.enqueueSnackbar(`${name} was just created. You can fill all the business' information`, { variant: 'success' });
        }
        // TODO: Handle is status is something else. There must be an error in the backend.
        return this.props.history.push(`/business/${id}`);
      }
    }
    return this.props.enqueueSnackbar('An error occured while trying to create this business. Please try again later.', { variant: 'error' });
  }

  handleValidatePhone = (message) => {
    if (message === 'Phone already validated.') {
      this.setState({ phoneValidated: true });
      return this.props.enqueueSnackbar('This phone number is already validated. ✌️', { variant: 'default' });
    } else if (message === 'Message sent.') {
      this.setState({ needsVerification: true });
      return this.props.enqueueSnackbar('We sent a verification code to your phone.', { variant: 'default' });
    }
    return this.props.enqueueSnackbar('Something happened when we tried to validate your phone number. Please try again later.', { variant: 'error' });
  }

  handleVerifyPhone = (message) => {
    if (message === 'Phone validated.') {
      this.setState({ phoneValidated: true });
      return this.props.enqueueSnackbar('This phone number is now validated validated. ✌️', { variant: 'default' });
    }
    return this.props.enqueueSnackbar('This is not the correct verification code.', { variant: 'default' });
  }

  render() {
    const vs = BedderValidator.getValidators();
    const user = Bedder.getUser();
    return (
      <>
        <Helmet>
          <title>Create a new accomodation</title>
        </Helmet>
        <Grid container style={{ marginTop: 15, padding: '30px 15px' }}>
          <Hidden xsDown><Grid item xs={12} sm={1} lg={2}>&nbsp;</Grid></Hidden>
          <Grid item xs={12} sm={10} lg={8}>
            <div style={{ marginBottom: 40, position: 'relative' }}>
              <Hidden smDown>
                <BackButton style={{ position: 'absolute', top: 10 }} />
              </Hidden>
              <PageTitle>
                Create a new accomodation
              </PageTitle>
            </div>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Validation
                  componentTag="TextField"
                  group="addBusiness"
                  validators={[vs.notEmpty]}
                >
                  <TextField
                    fullWidth
                    label="Name of the accomodation"
                    placeholder="Hostel One Miru"
                    id="name"
                    name="name"
                    required
                    value={this.state.name}
                    onChange={this.saveToState}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Validation>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl component="fieldset">
                  <FormLabel component="legend" style={{ fontSize: 14 }}>Are you the owner of this business?</FormLabel>
                  <FormGroup row>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={this.state.isOwner}
                          onChange={() => this.handleChange('isOwner', true)}
                          value="checkedA"
                        />
                      }
                      label="Yes"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={!this.state.isOwner}
                          onChange={() => this.handleChange('isOwner', false)}
                          value="checkedB"
                        />
                      }
                      label="No"
                    />
                    <FormHelperText style={{ marginTop: '-3px' }}>If you&#39;re the owner of this business, you won&#39;t make any revenue on bookings made with Bedder Travel. However, the reservation fee will be lowered for your clients.</FormHelperText>
                  </FormGroup>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Validation
                  componentTag="TextField"
                  group="addBusiness"
                  validators={[vs.notEmpty, vs.isEmail]}
                >
                  <TextField
                    fullWidth
                    label="Email of the owner"
                    placeholder={this.state.isOwner ? 'Your email will be used' : 'john@hostelonemiru.cz'}
                    id="ownerEmail"
                    name="ownerEmail"
                    value={this.state.isOwner ? user.email : this.state.ownerEmail}
                    onChange={this.saveToState}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    helperText="If there's a user with this email, this user will have all rights to edit this business."
                  />
                </Validation>
              </Grid>
              <Grid item xs={12} sm={6}>
                <AcceptViaSms checked={this.state.smsNotification} onClick={this.handleSmsChange}/>
              </Grid>
              {this.state.smsNotification && <React.Fragment>
                <Grid item xs={12} sm={6} style={{ position: 'relative'}}>
                  <FormControl component="fieldset">
                    <FormLabel component="legend" style={{ fontSize: 14 }}>Enter the phone number where we should send notifications</FormLabel>
                    <MuiPhoneNumber
                      defaultCountry="us"
                      disableAreaCodes
                      onChange={this.handlePhoneChange}
                      fullWidth
                    />
                  </FormControl>
                  {this.state.phoneValidated && <CheckCircleIcon color="primary" style={{ position: 'absolute', bottom: '15px'}} />}
                </Grid>
                {!this.state.phoneValidated ?
                  !this.state.needsVerification
                    ? <Grid item xs={12} sm={6}>
                      <AddPhoneButton ownerPhone={this.state.ownerPhone} handleValidatePhone={this.handleValidatePhone} />
                    </Grid>
                    : <Grid item xs={12} sm={6}>
                      <VerifyPhoneButton verificationCode={this.state.verificationCode} saveToState={this.saveToState} ownerPhone={this.state.ownerPhone} handleVerifyPhone={this.handleVerifyPhone} />
                    </Grid>
                  : null
                }
              </React.Fragment>}
            </Grid>
            <Grid item xs={12} style={{ marginTop: 40 }}>
              {!this.state.valid && <MessageError error="Please make sure all fields are filled correctly." />}
              <AddBusinessButton
                name={this.state.name}
                ownerEmail={this.state.isOwner ? user.email : this.state.ownerEmail}
                ownerPhone={this.state.ownerPhone}
                handleSubmit={this.handleSubmit}
              />
            </Grid>
          </Grid>
        </Grid>
      </>
    );
  }
}

export default compose(
  withRouter,
  withSnackbar
)(BusinessAddPage);
