import React from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import { Validation } from 'react-validation-framework';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Button } from '@material-ui/core';
import LinearProgress from '@material-ui/core/LinearProgress';
import TextField from '@material-ui/core/TextField';
import Hidden from '@material-ui/core/Hidden';

import BackButton from 'components/BackButton';
import Photos from 'components/Photos';
import ErrorNetwork from 'components/ErrorNetwork';
import ErrorResult from 'components/ErrorResult';
import BedderLoadingIndicator from 'components/BedderLoadingIndicator';

import BedderValidator from 'bedder/bedderValidator';
import Bedder from 'bedder/bedder';

import saga from './saga';
import { mapDispatchToProps, mapStateToProps } from './UserProfileRedux/mapProps';
import reducer from './UserProfileRedux/reducer';

const styles = theme => ({
  paperBg: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    fontSize: '14pt',
    fontWeight: 'bold',
    padding: '5px 0px',
  },
  secondRow: {
    backgroundColor: theme.palette.grey[200],
  },
  white: {
    color: 'white',
  },
});

export class UserProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      changingPassword: false,
    };
    this.vRefs = BedderValidator.makeRefs(BedderValidator.getUserProfilePage());
  }

  submitSave = () => {
    let isValid = true;
    Object.keys(this.vRefs).forEach(key => {
      if (this.state.changingPassword === false
        && (key === 'newPassword'
        || key === 'oldPassword'
        || key === 'newPasswordRepeat')) {
        return false;
      }
      if (this.vRefs[key].current && !BedderValidator.validate({ current: this.vRefs[key] })) {
        isValid = false;
      }
    });
    if (isValid) {
      this.props.submitSave();
    }
  }

  changeNewPassword = (evt) => {
    if (evt.target.value.length > 0) {
      this.setState({ changingPassword: true });
    } else {
      this.setState({ changingPassword: false });
    }
    this.props.onChangeNewPassword(evt);
  }

  componentDidMount() {
    this.props.submit();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.submitSaveResult !== this.props.submitSaveResult && this.props.submitSaveResult && this.props.submitSaveResult.result && this.props.submitSaveResult.result.id  && this.props.submitSaveResult.result.id > 0) {
      Bedder.setUser(this.props.submitSaveResult.result);
      Bedder.login(this.props.dispatch);
    }
  }

  render() {
    const { classes } = this.props;
    const vs = BedderValidator.getValidators();
    return (
      <div>
        <Helmet>
          <title>Your Profile</title>
          <meta name="description" content="Description of UserProfilePage" />
        </Helmet>

        {this.props.submitting
          ? <BedderLoadingIndicator />
          : <Grid container style={{ marginTop: 15 }}>
            <Grid item xs={2}>
              <Hidden mdUp>
                <BackButton style={{ position: 'absolute' }} />
              </Hidden>
            </Grid>

            <Grid item xs={8}>
              <Hidden smDown>
                <BackButton style={{ position: 'absolute' }} />
              </Hidden>
              <Typography variant="subtitle1" align="center">Settings</Typography>
            </Grid>

            <Hidden smDown>
              <Grid item xs={3} style={{ paddingRight: 30, paddingTop: 27 }}>
                <Typography align="right" variant="subtitle2">
                  My profile
                </Typography>
                <LinearProgress value={100} variant="determinate" />
              </Grid>
            </Hidden>

            <Grid item xs={12} md={9}>
              <Grid container spacing={4}>
                <Grid item xs={12} md={8}>
                  <Grid container spacing={4}>
                    <Grid item xs={12} md={6}>
                      <Validation
                        componentTag="TextField"
                        ref={this.vRefs.firstname}
                        onChangeCallback="onChange"
                        validators={[vs.notEmpty]}
                      >
                        <TextField
                          fullWidth
                          id="firstname"
                          label="Enter first name"
                          value={this.props.firstname}
                          onChange={this.props.onChangeFirstname}
                        />
                      </Validation>
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <Validation
                        componentTag="TextField"
                        ref={this.vRefs.lastname}
                        onChangeCallback="onChange"
                        validators={[vs.notEmpty]}
                      >
                        <TextField
                          fullWidth
                          id="lastname"
                          label="Enter last name"
                          value={this.props.lastname}
                          onChange={this.props.onChangeLastname}
                        />
                      </Validation>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={12} md={4}>
                  <Typography>Add a picture of you</Typography>
                  <Photos
                    addPhoto={this.props.addPhoto}
                    photos={this.props.photos}
                    removePhoto={this.props.deletePhoto}
                  />
                </Grid>

                <Grid item xs={12} md={8} style={{ marginBottom: 20 }}>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    id="about"
                    label="About you"
                    value={this.props.about || ''}
                    onChange={this.props.onChangeAbout}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Hidden smDown>
              <Grid item xs={3} style={{ paddingRight: 30, paddingTop: 27, }}>
                <Typography align="right" variant="subtitle2">
                  Personal information
                </Typography>
                <LinearProgress value={100} variant="determinate" />
              </Grid>
            </Hidden>


            <Grid item xs={12} md={9}>
              <Grid container spacing={4}>
                <Grid item xs={12} md={4}>
                  <Validation
                    componentTag="TextField"
                    ref={this.vRefs.email}
                    onChangeCallback="onChange"
                    validators={[vs.notEmpty]}>
                      <TextField
                        fullWidth
                        disabled={true}
                        id="email"
                        label="Enter email"
                        value={this.props.email}
                        onChange={this.props.onChangeEmail}
                      />
                  </Validation>
                </Grid>

                <Grid item xs={12}>&nbsp;</Grid>

                <Grid item xs={12} md={4}>
                  <Validation
                    componentTag="TextField"
                    ref={this.vRefs.newPassword}
                    onChangeCallback="onChange"
                    validators={[vs.notEmpty, vs.passwordLength]}>
                      <TextField
                        fullWidth
                        id="newPassword"
                        label="Enter new password"
                        value={this.props.newPassword}
                        onChange={this.changeNewPassword}
                      />
                  </Validation>
                </Grid>

                {this.state.changingPassword && (
                  <Grid item xs={12} md={4}>
                    <Validation
                      componentTag="TextField"
                      ref={this.vRefs.newPasswordRepeat}
                      onChangeCallback="onChange"
                      validators={[vs.notEmpty,, vs.passwordLength, {
                        validator: val => {
                          return val === this.props.newPassword
                        },
                        errorPropValue: true,
                        errorMessage: 'passwordsMismatch'
                      }]}
                    >
                      <TextField
                        fullWidth
                        id="newPasswordRepeat"
                        label="Repeat new password"
                        value={this.props.newPasswordRepeat}
                        onChange={this.props.onChangeNewPasswordRepeat}
                      />
                    </Validation>
                  </Grid>
                )}
              </Grid>
            </Grid>


            <Grid item xs={3} style={{ textAlign: 'right', paddingRight: 15 }}>

              {this.props.submitSaveResult && (
                <div style={{ marginBottom: 15 }}><ErrorResult result={this.props.submitSaveResult} /></div>
              )}

              {this.props.submitSaveError && (
                <ErrorNetwork error={this.props.submitSaveError} />
              )}
            </Grid>
            <Grid item xs={9}>
              <div>&nbsp;</div>

              <Button disabled={this.props.submitSaveSubmitting} variant="contained" color="primary" onClick={this.submitSave}>
                {this.props.submitSaveSubmitting ? <CircularProgress size={20} classes={{ circle: classes.white }} /> : 'Save'}
              </Button>

              {this.props.submitSaveResult && this.props.submitSaveResult.result && this.props.submitSaveResult.result.id && this.props.submitSaveResult.result.id > 0 && (
                <span> Saved</span>
              )}
            </Grid>
          </Grid>
        }
      </div>
    );
  }
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
const withReducer = injectReducer({ key: 'userProfilePage', reducer});
const withSaga = injectSaga({ key: 'userProfilePage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
  withStyles(styles),
)(UserProfilePage);

export { withConnect };
