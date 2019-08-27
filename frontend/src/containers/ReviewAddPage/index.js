import React from 'react';
import { withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { withSnackbar } from 'notistack';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import { withStyles } from '@material-ui/core/styles';

import BackButton from 'components/BackButton';
import ReviewSlider from 'components/ReviewSlider';
import MessageError from 'components/MessageError';

const styles = () => ({
  findButton: {
    minWidth: '200px',
    background: 'linear-gradient(90deg, #4b418c 0%, #8d4041 100%);',
    color: 'white',
    paddingTop: '13px',
    paddingBottom: '13px',
    textTransform: 'none',
  },
  styledInput: {
    '& label': {
      fontWeight: '700',
      color: 'black',
      fontStyle: 'italic',
      top: '-10px',
    },
  },
  white: {
    color: 'white',
  },
});

const ADD_REVIEW_MUTATION = gql`
  mutation ADD_REVIEW_MUTATION($bookingId: Int!, $ratingMoney: Int!, $ratingStaff: Int!, $ratingLocation: Int!, $ratingCleanliness: Int!, $ratingServices: Int!, $description: String) {
    addReview(bookingId: $bookingId, ratingMoney: $ratingMoney, ratingStaff: $ratingStaff, ratingLocation: $ratingLocation, ratingCleanliness: $ratingCleanliness, ratingServices: $ratingServices, description: $description) {
      message
    }
  }
`;

export class ReviewAddPage extends React.Component {
  state = {
    ratingMoney: 10,
    ratingStaff: 10,
    ratingLocation: 10,
    ratingCleanliness: 10,
    ratingServices: 10,
    reviewDescription: 'Bla Desc',
  };

  updateValue = (ratingToUpdate, rating) => this.setState({ [ratingToUpdate]: rating });

  saveToState = e => this.setState({ [e.target.name]: e.target.value });

  handleSubmit = async (addReview) => {
    if (this.props.match.params && this.props.match.params.id) {
      try {
        await addReview({
          variables: {
            bookingId: parseInt(this.props.match.params.id),
          },
        });
      } catch (error) {
        console.log(error);
        return false;
      }
      this.props.enqueueSnackbar('Review added successfully. Thanks for your feedback.', { variant: 'success' });
      this.props.history.push('/bookings');
    }
  }

  render() {
    const { classes } = this.props;
    const { ratingMoney, ratingStaff, ratingLocation, ratingCleanliness, ratingServices, reviewTitle, reviewDescription } = this.state;
    return (
      <>
        <Helmet>
          <title>Review your stay</title>
        </Helmet>
        <Grid container style={{ marginTop: 15 }}>

          <Grid item xs={12}>&nbsp;</Grid>

          <Grid item xs={3}>
            &nbsp;
            <Hidden mdUp>
              <BackButton style={{ position: 'absolute' }} />
            </Hidden>
          </Grid>
          <Grid item xs={6}>
            <Hidden smDown>
              <BackButton style={{ position: 'absolute' }} />
            </Hidden>
            <Typography variant="headline" align="center">How was your trip?</Typography>
          </Grid>
          <Grid item xs={3}>&nbsp;</Grid>

          <Grid item xs={12}>&nbsp;</Grid>
        </Grid>
        <Grid container justify="center" alignContent="center">
          <Grid item xs={12} md={9} lg={6} style={{ padding: 20 }}>
            <Grid container alignContent="center" spacing={24}>
              <Grid item xs={12} md={6} style={{ padding: 20 }}>
                <ReviewSlider
                  rating={ratingMoney}
                  text="Value for money"
                  onChange={this.updateValue}
                  ratingToUpdate="ratingMoney"
                />
              </Grid>
              <Grid item xs={12} md={6} style={{ padding: 20 }}>
                <ReviewSlider
                  rating={ratingStaff}
                  text="Quality of staff"
                  onChange={this.updateValue}
                  ratingToUpdate="ratingStaff"
                />
              </Grid>
              <Grid item xs={12} md={6} style={{ padding: 20 }}>
                <ReviewSlider
                  rating={ratingLocation}
                  text="Location"
                  onChange={this.updateValue}
                  ratingToUpdate="ratingLocation"
                />
              </Grid>
              <Grid item xs={12} md={6} style={{ padding: 20 }}>
                <ReviewSlider
                  rating={ratingCleanliness}
                  text="State / Cleanliness"
                  onChange={this.updateValue}
                  ratingToUpdate="ratingCleanliness"
                />
              </Grid>
              <Grid item xs={12} md={6} style={{ padding: 20 }}>
                <ReviewSlider
                  rating={ratingServices}
                  text="Services"
                  onChange={this.updateValue}
                  ratingToUpdate="ratingServices"
                />
              </Grid>
            </Grid>
            <Grid container justify="center" alignContent="center" spacing={24} classes={{ container: classes.styledInput }}>
              <Grid item xs={12} align="left" style={{ padding: 20 }}>
                <TextField
                  label="Describe your experience"
                  placeholder="Friendly staff, clean room, will definitely go again!"
                  multiline
                  rows="4"
                  margin="normal"
                  fullWidth
                  onChange={this.saveToState}
                  inputProps={{
                    name: 'reviewDescription',
                  }}
                />
              </Grid>
              <Grid item xs={12} align="left" style={{ padding: 20 }}>
                <Mutation
                  mutation={ADD_REVIEW_MUTATION}
                  variables={{
                    ratingMoney,
                    ratingStaff,
                    ratingLocation,
                    ratingCleanliness,
                    ratingServices,
                    description: reviewDescription,
                  }}
                >
                  {(addReview, { loading, error }) => console.log(error) || (
                    <React.Fragment>
                      <Button
                        onClick={() => this.handleSubmit(addReview)}
                        classes={{
                          root: classes.findButton,
                        }}
                        disabled={loading}
                      >
                        {loading ? (<CircularProgress size={20} classes={{ circle: classes.white }} />) : 'Send'}
                      </Button>
                      {error && <MessageError error={error} />}
                    </React.Fragment>
                  )}
                </Mutation>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </>
    );
  }
}

export default compose(
  withStyles(styles),
  withRouter,
  withSnackbar,
)(ReviewAddPage);
