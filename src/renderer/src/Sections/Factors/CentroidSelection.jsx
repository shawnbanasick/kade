import TraditionalCentroidButton from './factorSelection/TraditionalCentroidButton';
import Horst55CentroidModal from './factorSelection/Horst55CentroidModal';
// import TuckerMacCallumButton from "./factorSelection/TuckerMacCallumCentroidButton";
import factorState from '../GlobalState/factorState';

const TypeOfCentroidTransitionContainer = () => {
  const showCentroidSelection = factorState((state) => state.showCentroidSelection);

  if (showCentroidSelection) {
    return (
      <div
        id="typeOfCentroidButtonContainer"
        className="flex  w-full max-w-200 mt-5 justify-between px-3"
      >
        <TraditionalCentroidButton />
        {/* <TuckerMacCallumButton /> */}
        <Horst55CentroidModal />
      </div>
    );
  } else {
    return null;
  }
};

export default TypeOfCentroidTransitionContainer;
