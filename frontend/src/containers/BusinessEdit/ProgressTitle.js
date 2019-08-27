import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const Title = styled.h4`
  font-size: 18px;
  line-height: 21px;
  font-weight: 500;
  font-style: italic;
  text-align: right;
  margin-top: 0px;
  margin-bottom: 10px;
`;

const ProgressText = styled.p`
  font-size: 12px;
  line-height: 13px;
  text-align: right;
  color: #4B3F8F;
  font-style: italic;
`;

const styles = {
  root: {
    backgroundColor: 'white',
    boxShadow: '0px 2px 2px rgba(0,0,0,0.15)',
    height: '1.5px',
  },
  bar1Determinate: {
    background: 'linear-gradient(90deg, rgb(141, 64, 65) 0%, rgb(75, 65, 140) 100%)',
    transition: 'transform .4s linear',
  },
};

const ProgressTitle = ({ classes, text, progress }) => (
  <>
    <Title>{text}</Title>
    <LinearProgress value={progress} variant="determinate" classes={classes} />
    <ProgressText>{`${progress}% complete`}</ProgressText>
  </>
);

ProgressTitle.propTypes = {
  classes: PropTypes.object.isRequired,
  text: PropTypes.string.isRequired,
  progress: PropTypes.number.isRequired,
};

export default withStyles(styles)(ProgressTitle);