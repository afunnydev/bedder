import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';

const BadgePaperText = styled(Typography)`
  font-size: ${props => props.smallFont ? 18 : 22 }px !important;
  font-weight: 700 !important;
  font-style: italic;
`;

export default BadgePaperText;