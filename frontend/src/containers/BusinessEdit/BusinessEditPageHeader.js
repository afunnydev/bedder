import React from 'react';
import styled from 'styled-components';

import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';

import BackButton from 'components/BackButton';
import PageTitle from 'components/styles/PageTitle';

const HeaderContainer = styled(Grid)`
  position: relative;
  min-height: 80px;
  margin-bottom: 20px;
  button {
    top: 22px;
  }
  h1 {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    margin-top: 0;
  }
  @media (min-width: 600px) {
    min-height: 120px;
    margin-bottom: 20px;
    button {
      top: 44px;
    }
  }
`;

const BusinessEditPageHeader = () => (
  <HeaderContainer container>
    <Hidden smDown><Grid item xs={12} md={3}>&nbsp;</Grid></Hidden>
    <Grid item xs={12} md={9}>
      <Hidden smDown>
        <BackButton />
      </Hidden>
      <PageTitle spaced>Edit business</PageTitle>
    </Grid>
  </HeaderContainer>
);

export default BusinessEditPageHeader;