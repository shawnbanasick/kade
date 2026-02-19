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
    <div className="flex flex-row">
      <GeneralButton
        id="clockwise"
        onClick={(e) => handleClick(e, baselineData)}
        className="bg-grey-button text-xl! p-1! font-bold! h-[30px] w-[30px] ml-[10px]! mr-[10px]!"
      >
        {'\u21BB'}
      </GeneralButton>

      <GeneralButton
        id="counterClockwise"
        onClick={(e) => handleClick(e, baselineData)}
        className="bg-grey-button text-xl! p-1! font-bold! h-[30px] w-[30px]"
      >
        {'\u21BA'}
      </GeneralButton>
    </div>
  );
};

export default ClockwiseButtons;
