/**
 *
 * GainsPage
 *
 */

import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import { Link } from 'react-router-dom';

import injectSaga from 'utils/injectSaga';

import styled from 'styled-components';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import BedderLoadingIndicator from 'components/BedderLoadingIndicator';
import StripeButton from 'components/styles/StripeButton';
import saga from './saga';


const styles = theme => ({
  paperBg: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    fontSize: '14pt',
    fontWeight: 'bold',
    padding: '5px 0px',
  },

});

const StyledPaper = styled(Paper)`
  padding: 10px;
`;

const StyledBlockPaper = styled(StyledPaper)`
  height: 135px;
  text-align: center;
`;

const InfoLink = styled(Link)`
  font-size: 0.8rem;
  text-decoration: underline;
`;

/* eslint-disable react/prefer-stateless-function */
export class GainsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    this.props.submit();
  }

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Helmet>
          <title>My Earnings</title>
        </Helmet>
        <Typography align="center" style={{ paddingTop: 25 }} variant="headline">My Earnings</Typography>
        {this.props.gainsSubmitting ?
          <BedderLoadingIndicator /> : (
            <Grid container justify="center" alignContent="center">
              <Grid item xs={12} md={12} lg={10} style={{ padding: 20 }}>
                <Grid container justify="center" alignContent="center" spacing={24}>

                  <Grid item xs={12} sm={4} md={3}>
                    <StyledBlockPaper>
                      <Grid container style={{ height: '100%' }}>
                        <Grid item xs={12}>
                          <Paper className={classes.paperBg}>
                            {this.props.gainsResult && this.props.gainsResult.stats && (this.props.gainsResult.stats.month) || ('-')} USD
                          </Paper>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography color="primary" variant="title">This month</Typography>
                        </Grid>
                      </Grid>
                    </StyledBlockPaper>
                  </Grid>

                  <Grid item xs={12} sm={4} md={3}>
                    <StyledBlockPaper>
                      <Grid container style={{ height: '100%' }}>
                        <Grid item xs={12}>
                          <Paper className={classes.paperBg}>
                            {this.props.gainsResult && this.props.gainsResult.stats && (this.props.gainsResult.stats.year) || ('-')} USD
                          </Paper>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography color="primary" variant="title">This year</Typography>
                        </Grid>
                      </Grid>
                    </StyledBlockPaper>
                  </Grid>

                  <Grid item xs={12} sm={4} md={3}>
                    <StyledBlockPaper>
                      <Grid container style={{ height: '100%' }}>
                        <Grid item xs={12}>
                          <Paper className={classes.paperBg}>
                            {this.props.gainsResult && this.props.gainsResult.stats && (this.props.gainsResult.stats.all) || ('-')} USD
                          </Paper>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography color="primary" variant="title">All time earnings</Typography>
                        </Grid>
                      </Grid>
                    </StyledBlockPaper>
                  </Grid>

                  <Grid item xs={12} sm={12} md={3}>
                    <StyledBlockPaper>
                      <Grid container style={{ height: '100%' }}>
                        <Grid item xs={12}>
                          <Typography color="primary" variant="title" gutterBottom>Receive your money</Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <StripeButton href="https://connect.stripe.com/oauth/authorize?response_type=code&client_id=ca_F0prMzgC4teMjiZVCZ0ItC6pnCCuUPVF&scope=read_write&state=thisisawesome"><span>Connect with Stripe</span></StripeButton>
                        </Grid>
                        <Grid item xs={12}>
                          <InfoLink to="/faq">What is this?</InfoLink>
                        </Grid>
                      </Grid>
                    </StyledBlockPaper>
                  </Grid>

                </Grid>
              </Grid>
            </Grid>
          )
        }
        <Typography align="center" style={{ paddingTop: 25 }} variant="headline">Details</Typography>
        {this.props.gainsSubmitting ?
          null : (
            <Grid container justify="center" alignContent="center">
              <Grid item xs={12} md={12} lg={10} style={{ padding: 20 }}>
                <Grid container justify="center" alignContent="center" spacing={24}>

                  <Grid item xs={12}>
                    {!this.props.gainsResult || !this.props.gainsResult.result || !this.props.gainsResult.result.length && (
                      <Typography variant="paragraph">No booking was made with any of your accomodations yet.</Typography>
                    )}
                    {this.props.gainsResult && this.props.gainsResult.result && this.props.gainsResult.result.length > 0 && this.props.gainsResult.result.map((v, i) => (
                      <Paper key={v.id} width="100%" style={{ margin: '10px 0px', padding: '15px 10px' }}>
                        <Grid container>
                          <Grid item xs={12} sm={4} md={4}>
                            {moment(v.createdAt).format('LLL')}
                          </Grid>
                          <Grid item xs={7} sm={4} md={4}>
                            {`${v.booking.businessUnit.name} in ${v.booking.business.name}`}
                            <br />
                            {`${v.booking.payload.maxPersons} person${v.booking.payload.maxPersons > 1 ? 's' : ''} for ${moment(v.booking.to).diff(moment(v.booking.from), 'days')} night(s)`}
                          </Grid>
                          <Grid item xs={5} sm={4} md={4} align="right">
                              + {v.amount} USD
                          </Grid>
                        </Grid>
                      </Paper>
                    ))}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          )
        }
      </React.Fragment>
    );
  }
}

GainsPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);
const withSaga = injectSaga({ key: 'gainsPage', saga });

export default compose(
  withSaga,
  withConnect,
  withStyles(styles),
)(GainsPage);
