import styled from 'styled-components';

const PageTitle = styled.h1`
  font-size: 26px;
  line-height: 30px;
  font-family: Ubuntu;
  font-weight: 300;
  text-align: center;
  padding-top: ${props => props.spaced ? '20px' :'0px'};
  @media (min-width: 600px) {
    padding-top: ${props => props.spaced ? '30px' : '10px'};
    font-size: 32px;
    line-height: 48px;
  }
  @media (min-width: 800px) {
    font-size: 38px;
    line-height: 44px;
  }
  @media (min-width: 960px) {
    font-size: 42px;
    line-height: 48px;
  }
`;

export default PageTitle;