import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';

const StyledPaper = styled(Paper)`
  padding: 25px;
  margin-top: ${props => props.spaced ? '20px' : '0px'};
  margin-bottom: ${props => props.spaced ? '20px' : '0px'};
`;

export default StyledPaper;