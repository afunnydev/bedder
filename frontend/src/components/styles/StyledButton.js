import Button from '@material-ui/core/Button';
import styled from 'styled-components';

const StyledButton = styled(Button)`
  background: linear-gradient(90deg, #4b418c 0%, #8d4041 100%) !important;
  color: white !important;
  padding: 10px ${props => props.smallScreen ? 25 : 50}px !important;
`;

export default StyledButton;
