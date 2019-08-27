import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';

const style = {
  white: {
    color: 'white',
  },
};

const LoadingContainer = styled.div`
  margin: auto;
  margin-top: ${props => props.full ? '50px' : '0px'};
  z-index: ${props => props.center ? 100 : 'inherit'};
  position: ${props => props.center ? 'fixed' : 'relative'};
  top: ${props => props.center ? '50%' : 'initial'};
  left: ${props => props.center ? '50%' : 'initial'};
  margin-bottom: ${props => props.full ? '250px' : '0px'};
  width: ${props => props.containerWidth ? `${props.containerWidth}px` : 'initial'};
`;

const BedderLoadingIndicator = props => (
  <LoadingContainer center={props.center} full={props.full} containerWidth={props.size}>
    <CircularProgress size={props.size} classes={{ circle: props.white ? props.classes.white : null }} />
  </LoadingContainer>
);

BedderLoadingIndicator.defaultProps = {
  size: 40,
};

BedderLoadingIndicator.propTypes = {
  center: PropTypes.bool,
  white: PropTypes.bool,
  size: PropTypes.number,
  full: PropTypes.bool,
};

export default withStyles(style)(BedderLoadingIndicator);
