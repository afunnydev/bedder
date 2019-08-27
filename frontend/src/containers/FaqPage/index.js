/**
 *
 * FaqPage
 *
 */

import React from 'react';
import { Helmet } from 'react-helmet';

import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';

import BackButton from 'components/BackButton';
import Accordion from 'components/Accordion';

import json from './data.json';

const style = {
  aboutContainer: {
    color: 'black',
    paddingTop: 20,
    paddingBottom: 40,
    marginTop: 30,
  },
  aboutContent: {
    marginLeft: 'auto',
    padding: '0px 15px',
  },
  title: {
    fontSize: 42,
    fontWeight: 300,
    lineHeight: '50px',
    marginTop: 30,
    marginBottom: 30,
    color: 'black',
  }
};

const FaqPage = () => (
  <div>
    <Helmet>
      <title>FAQ</title>
    </Helmet>
    <Grid container direction="row" style={style.aboutContainer} >
      <Grid item sm={12} md={8} style={style.aboutContent}>
        <Grid container spacing={2} direction="row">
          <Hidden mdUp>
            <Grid item xs={12}>
              <BackButton />
            </Grid>
          </Hidden>
          <Grid item xs={12}>
            <Typography
              align="left"
              variant="h3"
              style={style.title}
            >
              Frequently Asked Question
            </Typography>
            <Accordion questions={json.questions} />
          </Grid>
          <Grid item xs={12}>
            <p>Your question is still unanswered? Contact us at <a href="mailto:info@beddertravel.com">info@beddertravel.com</a> for more information.</p>
          </Grid>
        </Grid>
      </Grid>
      <Hidden smDown>
        <Grid item md={1} />
      </Hidden>
    </Grid>
  </div>
);

export default FaqPage;
