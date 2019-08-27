import React from 'react';
import PropTypes from 'prop-types';
import { EmailShareButton } from 'react-share';

import Grid from '@material-ui/core/Grid';

import ShareOutlined from '@material-ui/icons/ShareOutlined';

import StyledPaper from 'components/styles/StyledPaper';
import BadgePaperText from 'components/styles/BadgePaperText';

const ShareButton = ({ name, location, payable, to, from}) => (
  <StyledPaper spaced>
    <Grid container>
      <Grid item xs={11}>
        <EmailShareButton
          subject={`My reservation at ${name} on Bedder Travel.`}
          body={
            `Accomodation: ${name}, ${location}
            Dates: ${from} to ${to}
            Pay at accomodation: ${payable.toFixed(2)} USD`
          }
        >
          <BadgePaperText variant="subtitle1" smallFont={true}>Share your reservation</BadgePaperText>
        </EmailShareButton>
      </Grid>
      <Grid item xs={1}>
        <EmailShareButton
          subject={`My reservation at ${name} on Bedder Travel.`}
          body={
            `Accomodation: ${name}, ${location}
            Dates: ${from} to ${to}
            Pay at accomodation: ${payable.toFixed(2)} USD`
          }
        >
          <ShareOutlined color="primary" />
        </EmailShareButton>
      </Grid>
    </Grid>
  </StyledPaper>
);

ShareButton.propTypes = {
  name: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  payable: PropTypes.number.isRequired,
  to: PropTypes.string.isRequired,
  from: PropTypes.string.isRequired,
};

export default ShareButton;