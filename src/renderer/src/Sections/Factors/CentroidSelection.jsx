import TraditionalCentroidButton from './factorSelection/TraditionalCentroidButton';
import Horst55CentroidModal from './factorSelection/Horst55CentroidModal';
// import TuckerMacCallumButton from "./factorSelection/TuckerMacCallumCentroidButton";
import factorState from '../GlobalState/factorState';

const TypeOfCentroidTransitionContainer = () => {
  const showCentroidSelection = factorState((state) => state.showCentroidSelection);

  if (showCentroidSelection) {
    return (
      <div className="flex mt-[25px] w-[800px] justify-start ml-[70px]">
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
