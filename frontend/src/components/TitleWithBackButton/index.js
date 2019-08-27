import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Grid from '@material-ui/core/Grid';

import BackButton from 'components/BackButton';
import PageTitle from 'components/styles/PageTitle';

const HeaderContainer = styled(Grid)`
  position: relative;
  min-height: 80px;
  margin-bottom: 20px;
  button {
    top: 14px;
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
      top: 33px;
    }
  }
`;

const TitleWithBackButton = ({ title }) => (
  <HeaderContainer item xs={12}>
    <BackButton />
    <PageTitle>{title}</PageTitle>
  </HeaderContainer>
);

TitleWithBackButton.propTypes = {
  title: PropTypes.string.isRequired,
};

export default TitleWithBackButton;
