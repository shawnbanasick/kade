import SpinnerCircle from './SpinnerCircle';
import ScreeContainer from './FactorScreePlot/ScreeContainer';
import EigenTable from './FactorTableEigen/EigenTable';
import UnrotatedFactorTable from './FactorTable/UnrotatedFactorTable';
import HorstWarningMessage from './factorSelection/HorstWarningMessage';
import factorState from '../GlobalState/factorState';

const UnrotatedFactorsTransitionContainer = () => {
  const showUnrotatedFactorTable = factorState((state) => state.showUnrotatedFactorTable);
  const showCentroidSpinner = factorState((state) => state.showCentroidSpinner);

  if (showUnrotatedFactorTable) {
    return (
      <div className="[grid-row-start:3] ml-[70px] mt-[40px]">
        <HorstWarningMessage />
        <UnrotatedFactorTable />
        <EigenTable />
        <ScreeContainer />
      </div>
    );
  }

  if (showCentroidSpinner) {
    return <SpinnerCircle />;
  }

  if (!showUnrotatedFactorTable && !showCentroidSpinner) {
    return <div className="[grid-row-start:2]" />;
  }
};

export default UnrotatedFactorsTransitionContainer;
