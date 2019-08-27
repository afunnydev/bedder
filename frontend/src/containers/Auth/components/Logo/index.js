/**
 *
 * ComponentStateless
 *
 */

import React from 'react';
import styled from 'styled-components';
import WhiteLogo from 'components/LogoImage/bedder_white.png';

const StyledLogo = styled.img`
  width: 100%;
  margin-bottom: 25px;
  max-width: 300px;
`;

const Logo = () => <StyledLogo src={WhiteLogo} />;

export default Logo;
