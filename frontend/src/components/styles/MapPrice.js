import styled from 'styled-components';

const MapPrice = styled.div`
  text-align: center;
  background-color: white;
  color: #8F3F3F;
  border-radius: 3px;
  font-family: Ubuntu;
  font-size: 12px;
  line-height: 20px;
  font-weight: 700;
  position: relative;
  height: 20px;
  width: 50px;
  cursor: pointer;
  &:after {
    content:'';
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -8px;
    width: 0;
    height: 0;
    border-top: solid 8px white;
    border-left: solid 8px transparent;
    border-right: solid 8px transparent;
  }
`;

export default MapPrice;