import styled from 'styled-components';
import DesktopBg from './desktop_background_home-min.jpg';

const AuthWrapper = styled.div`
  margin: 0 auto;
  min-height: 100vh;
  background-color: black;
  background-image: url(${DesktopBg});
  background-position: center;
  background-size: cover;
  background-attachment: fixed;
  padding: 10px;
`;

export default AuthWrapper;
