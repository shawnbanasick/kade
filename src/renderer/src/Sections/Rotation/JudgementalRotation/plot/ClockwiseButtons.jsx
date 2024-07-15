import styled from 'styled-components';
import calculateRotatedFactors from '../rotationLogic/calculateRotatedFactors';
import GeneralButton from '../../../../Utils/GeneralButton';
import rotationState from '../../../GlobalState/rotationState';

const ClockwiseButtons = (props) => {
  const rotateByDegrees = rotationState((state) => state.rotateByDegrees);

  const handleClick = (event, baselineData) => {
    const direction = event.target.id;
    event.stopPropagation();
    // call rotation
    calculateRotatedFactors(direction, rotateByDegrees, baselineData);
  };

  const baselineData = props.baselineData;
  return (
    <SpinButtonContainer>
      <ClockwiseButton
        as={GeneralButton}
        id="clockwise"
        onClick={(e) => handleClick(e, baselineData)}
      >
        {'\u21BB'}
      </ClockwiseButton>

      <CounterwiseButton
        as={GeneralButton}
        id="counterClockwise"
        onClick={(e) => handleClick(e, baselineData)}
      >
        {'\u21BA'}
      </CounterwiseButton>
    </SpinButtonContainer>
  );
};

export default ClockwiseButtons;

const ClockwiseButton = styled.div`
  font-size: 25px;
  font-weight: bolder;
  margin-left: 20px;
  margin-right: 15px;
`;

const CounterwiseButton = styled.div`
  font-size: 25px;
  font-weight: bolder;
  margin-right: 5px;
`;

const SpinButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
`;
