import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import MUIPlacesAutocomplete, { geocodeBySuggestion } from 'mui-places-autocomplete';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withApollo } from 'react-apollo';
import { withSnackbar } from 'notistack';

import { mapStateToProps, mapDispatchToProps } from './SearchBarRedux/mapProps';
import reducer from './SearchBarRedux/reducer';
import {
  changeLatAction,
  changeLocationAction,
  changeLonAction,
} from './SearchBarRedux/actions';
import { submitAction } from '../../containers/HomePage/actions';


import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import PersonIcon from '@material-ui/icons/Person';
import MyLocation from '@material-ui/icons/MyLocation';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import injectReducer from 'utils/injectReducer';
import { GUESTS_ARRAY, BED_ARRAY } from 'utils/constants';

const styles = theme => ({
  searchPaperItem: {
    padding: '12px',
  },
  searchPaperWrapper: {
    padding: '20px',
  },
  adornment: {
    marginRight: 8,
  },
  adornmentEnd: {
    cursor: 'pointer',
  },
  gridColumn: {
    padding: '0px 5px',
  },
  findButton: {
    minWidth: 'auto',
    background: 'linear-gradient(90deg, #4b418c 0%, #8d4041 100%);',
    color: 'white',
    height: '56px',
    maxHeight: 'initial',
  },
  renderDiv: {
    maxWidth: 500,
  },
  primaryColor: {
    color: theme.palette.primary.main,
  },
  white: {
    color: 'white',
  },

  /*
   * md to lg
   */
  '@media (max-width: 1259px)': {
    caretAdjustment: {
      paddingRight: 16,
    },
  },

  /*
   * xs to md
   */
  '@media (max-width: 959px)': {
    gridColumn: {
      padding: '10px 8px',
      textAlign: 'left'
    },
    gridColumnLeft: {
      padding: '10px 8px',
      paddingRight: 7.5,
    },
    gridColumnRight: {
      padding: '10px 8px',
      paddingLeft: 7.5,
    },
    searchPaperWrapper: {
      background: 'transparent',
      boxShadow: 'none',
    },
    searchPaper: {
      background: 'transparent',
      boxShadow: 'none',
    },
  }
});

const SearchBar = (props) => {
  const momentNow = new Date().setHours(0, 0, 0, 0);
  const google = window.google;

  const setFromDate = (date) => console.log(date) || props.onChangeFromVal(date);
  const setToDate = (date) => props.onChangeToVal(date);
  const dispatchSubmit = () => props.dispatch(submitAction());
  const validate = () => {
    if (props.location && props.location.length <= 0) return false;
    if (!props.from || props.from < momentNow) return false;
    if (!props.to || props.to <= props.from) return false;
    return true;
  };

  const submit = () => {
    if (!validate()) {
      return props.enqueueSnackbar('You need at least 1 night in your search. Please correct your dates.', { variant: 'error' });
    }

    switch (props.location.pathname) {
    case '/home':
      props.dispatch(submitAction());
      break;
    default:
      props.history.push('/home');
      setTimeout(dispatchSubmit, 700);
      break;
    }

    const bookingData = { 
      bookingStartDate: props.from.toUTCString(),
      bookingEndDate: props.to.toUTCString(),
      bookingNumBeds: props.numBed,
      bookingNumPeople: props.maxPersons,
    };

    // We are connecting what happened in the redux store to the apollo client
    props.client.writeData({data: bookingData });
    // These values are saved in local storage to be reused if the users reloads. 
    // TODO: Currently, they are not used in the SearchBar components, but they should be.
    for (let property in bookingData) {
      localStorage.setItem(property, bookingData[property]);
    }
  };

  const getGeolocationF = () => navigator.geolocation.getCurrentPosition(getGeolocation);

  const getGeolocation = (location) => {
    const { latitude, longitude, accuracy } = location.coords;
    // TODO: We are not using accuracy here, but we shoud.

    const geocoder = new google.maps.Geocoder();
    geocoder.geocode(
      {
        location: { lat: latitude, lng: longitude },
      },
      (results, status) => {
        if (status === 'OK') {
          if (results[0]) {
            props.dispatch(changeLocationAction(results[0].formatted_address));
            props.dispatch(changeLatAction(results[0].geometry.location.lat()));
            props.dispatch(changeLonAction(results[0].geometry.location.lng()));
          } 
        } else {
          console.log(`Geocoder failed due to: ${status}`);
          return props.enqueueSnackbar('An error occured while locating you. Please enter the location manually.', { variant: 'error' });
          
        }
      },
    );
  };

  const suggestionSelected = (suggestion) => {
    props.dispatch(changeLocationAction(suggestion.description));
    geocodeBySuggestion(suggestion)
      .then((results) => {
        if (results.length < 1) {
          return;
        }

        const { geometry } = results[0];
        props.dispatch(changeLatAction(geometry.location.lat()));
        props.dispatch(changeLonAction(geometry.location.lng()));
      })
      .catch((err) => {
        console.log('geocode err.message', err.message);
      });
  };

  return (
    <Paper className={props.classes.searchPaperWrapper} square>
      <Paper className={props.classes.searchPaper} elevation={0}>
        <Grid container>

          {/* 
            Search Form
          */}
          {!props.displayButtonOnly 
            ? <React.Fragment>

              {/* 
                Location Selector
              */}
              {props.hideLocation || (
                <Grid item xs={12} md={3}>
                  <div className={props.classes.gridColumn}>
                    <Paper className={props.classes.searchPaperItem}>
                      <MUIPlacesAutocomplete
                        textFieldProps={{
                          fullWidth: true,
                          value: props.locationText,
                          id: 'location',
                          onChange: props.onChangeLocation,
                          InputProps: {
                            disableUnderline: true,
                            placeholder: 'Anywhere',
                            startAdornment: (
                              <InputAdornment
                                position="start"
                                className={props.classes.adornment}
                              >
                                <span className="icon-search" />
                              </InputAdornment>
                            ),
                            endAdornment: (
                              <InputAdornment
                                onClick={getGeolocationF}
                                position="end"
                                className={props.classes.adornmentEnd}
                              >
                                <MyLocation color="primary" />
                              </InputAdornment>
                            ),
                          },
                        }}
                        onSuggestionSelected={suggestionSelected}
                        renderTarget={() => <div className={props.classes.renderDiv} />}
                      />
                    </Paper>
                  </div>
                </Grid>
              )}


              {/* 
                Date Picker
              */}
              <Grid item xs={12} md={5}>
                <Grid container>

                  {/* 
                    From
                  */}
                  <Grid item xs={6}>
                    <div className={props.classes.gridColumn}>
                      <Paper className={props.classes.searchPaperItem}>
                        <DatePicker
                          id="from"
                          selected={props.from}
                          fullWidth
                          onChange={setFromDate}
                          minDate={momentNow}
                          customInput={
                            <TextField
                              fullWidth
                              error
                              InputProps={{
                                disableUnderline: true,
                                placeholder: 'dd/mm/yyyy',
                                startAdornment: (
                                  <InputAdornment
                                    position="start"
                                    className={props.classes.adornment}
                                  >
                                    <span className={props.classes.primaryColor}>
                                      <span className="icon-go" />
                                    </span>
                                  </InputAdornment>
                                ),
                              }}
                            />
                          }
                        />
                      </Paper>
                    </div>
                  </Grid>

                  {/* 
                    To
                  */}
                  <Grid item xs={6}>
                    <div className={props.classes.gridColumn}>
                      <Paper className={props.classes.searchPaperItem}>
                        <DatePicker
                          id="to"
                          selected={props.to}
                          fullWidth
                          onChange={setToDate}
                          minDate={props.from}
                          customInput={
                            <TextField
                              fullWidth
                              InputProps={{
                                disableUnderline: true,
                                placeholder: 'dd/mm/yyyy',
                                startAdornment: (
                                  <InputAdornment
                                    position="start"
                                    className={props.classes.adornment}
                                  >
                                    <span className={props.classes.primaryColor}>
                                      <span className="icon-back" />
                                    </span>
                                  </InputAdornment>
                                ),
                              }}
                            />
                          }
                        />
                      </Paper>
                    </div>
                  </Grid>

                </Grid>
              </Grid>

              {/* 
                Guest & Bed Selectors
              */}
              <Grid item xs={12} md={3}>

                <Grid container>

                  {/* 
                    Guest Selector
                  */}
                  <Grid item xs={6}>
                    <div className={props.classes.gridColumn}>
                      <Paper className={props.classes.searchPaperItem}>
                        <TextField
                          SelectProps={{
                            classes: { select: props.classes.caretAdjustment },
                          }}
                          id="maxPersons"
                          value={props.maxPersons}
                          select
                          fullWidth
                          onChange={props.onChangeNumPeople}
                          InputProps={{
                            disableUnderline: true,
                            startAdornment: (
                              <InputAdornment
                                position="start"
                                className={props.classes.adornment}
                              >
                                <PersonIcon className={props.classes.primaryColor} />
                              </InputAdornment>
                            ),
                          }}
                        >
                          {GUESTS_ARRAY.map(option => (
                            <MenuItem
                              key={option}
                              value={option}
                            >
                              {option}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Paper>
                    </div>
                  </Grid>

                  {/* 
                    Bed Selector
                  */}
                  <Grid item xs={6}>
                    <div className={props.classes.gridColumn}>
                      <Paper className={props.classes.searchPaperItem}>
                        <TextField
                          SelectProps={{
                            classes: { select: props.classes.caretAdjustment },
                          }}
                          id="numBed"
                          value={props.numBed}
                          select
                          fullWidth
                          onChange={props.onChangeNumBed}
                          InputProps={{
                            disableUnderline: true,
                            startAdornment: (
                              <InputAdornment
                                position="start"
                                className={props.classes.adornment}
                              >
                                <span className={props.classes.primaryColor}>
                                  <span className="icon-bed" />
                                </span>
                              </InputAdornment>
                            ),
                          }}
                        >
                          {BED_ARRAY.map(option => (
                            <MenuItem 
                              key={option} 
                              value={option}
                            >
                              {option}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Paper>
                    </div>
                  </Grid>
                </Grid>

              </Grid>

              {/* 
                Find Button (Only displaying when `displayFormOnly` is false)
              */}
              {props.displayFormOnly || (
                <Grid item xs={12} md={1}>
                  <div className={props.classes.gridColumn} align="right">
                    <Typography noWrap>
                      <Button
                        fullWidth
                        onClick={submit}
                        classes={{
                          root: props.classes.findButton,
                        }}>
                        {props.submitting ? (<CircularProgress size={20} classes={{ circle: props.classes.white }} />) : 'Find'}
                      </Button>
                    </Typography>
                  </div>
                </Grid>
              )}

            </React.Fragment>
            : <Grid item xs={12} md={1}>
              <div className={props.classes.gridColumn} align="right">
                <Typography noWrap>
                  <Button
                    fullWidth
                    onClick={submit}
                    classes={{
                      root: props.classes.findButton,
                    }}>
                    Find!
                  </Button>
                </Typography>
              </div>
            </Grid>
          }
        </Grid>
      </Paper>
    </Paper>
  );
};

SearchBar.defaultProps = {
  displayFormOnly: false,
  displayButtonOnly: false,
  hideLocation: false,
};

SearchBar.propTypes = {
  // Received from Redux
  from: PropTypes.object,
  onChangeFromVal: PropTypes.func.isRequired,
  to: PropTypes.object,
  onChangeToVal: PropTypes.func.isRequired,
  numBed: PropTypes.number.isRequired,
  onChangeNumBed: PropTypes.func.isRequired,
  maxPersons: PropTypes.number.isRequired,
  onChangeNumPeople: PropTypes.func.isRequired,
  locationText: PropTypes.string.isRequired,
  onChangeLocation: PropTypes.func.isRequired,
  // Passed manually
  submitting: PropTypes.bool,
  displayFormOnly: PropTypes.bool,
  displayButtonOnly: PropTypes.bool,
  hideLocation: PropTypes.bool,
  // Passed from HOC
  client: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  enqueueSnackbar: PropTypes.func.isRequired,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'searchBar', reducer });

export default compose(
  withConnect,
  withReducer,
  withRouter,
  withStyles(styles),
  withApollo,
  withSnackbar,
)(SearchBar);
