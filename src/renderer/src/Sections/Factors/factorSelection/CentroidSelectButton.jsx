import factorState from '../../GlobalState/factorState';
import GeneralButton from '../../../Utils/GeneralButton';

const CentroidSelectButton = () => {
  const isActive = factorState((state) => state.activeCentroidRevealButton);

  return (
    <div>
      <GeneralButton
        id="centroidSelectButton"
        size="big"
        toggle
        active={isActive}
        className="shadow-[0_2px_2px_0_black] hover:shadow-[0_2px_2px_0_black] active:shadow-[0_1px_1px_0_black] active:ml-[3px] active:translate-y-[1px]"
      >
        Centroid Factors 2
      </GeneralButton>
    </div>
  );
};

export default CentroidSelectButton;
