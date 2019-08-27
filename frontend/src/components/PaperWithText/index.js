import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Typography from '@material-ui/core/Typography';

import StyledPaper from 'components/styles/StyledPaper';

const Title = styled(Typography)`
  margin-bottom: 20px !important;
  font-weight: 700 !important;
  font-style: italic;
`;

const Description = styled(Typography)`
  margin-bottom: 20px !important;
`;

const PaperWithText = ({ texts, spaced }) => (
  <StyledPaper spaced={spaced}>
    {texts.map(text => (
      <React.Fragment key={text.title}>
        {text.title && <Title variant="body2">{text.title}</Title>}
        <Description variant="body1">{text.text}</Description>
      </React.Fragment>
    ))}
  </StyledPaper>
);

PaperWithText.defaultProps = {
  spaced: false,
};

PaperWithText.propTypes = {
  texts: PropTypes.array.isRequired,
  spaced: PropTypes.bool,
};

export default PaperWithText;