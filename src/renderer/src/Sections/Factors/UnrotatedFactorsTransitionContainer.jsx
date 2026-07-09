import { useMemo } from 'react';
import SpinnerCircle from './SpinnerCircle';
import ScreeContainer from './FactorScreePlot/ScreeContainer';
import EigenTable from './FactorTableEigen/EigenTable';
import UnrotatedFactorTable from './FactorTable/UnrotatedFactorTable';
import HorstWarningMessage from './factorSelection/HorstWarningMessage';
import factorState from '../GlobalState/factorState';
import structureState from '../GlobalState/structureState';
import i18n from 'i18next';
import determineNumberPCs from './PcaLogic/determineNumberPCs';

const UnrotatedFactorsTransitionContainer = () => {
  const showUnrotatedFactorTable = factorState((state) => state.showUnrotatedFactorTable);
  const showCentroidSpinner = factorState((state) => state.showCentroidSpinner);
  const hasParallelAnalysisFinished = structureState((state) => state.hasParallelAnalysisFinished);

  const numberofPrincipalComps = determineNumberPCs();
  const eigenvaluesArray = factorState((state) => state.eigenvaluesArray);
  const parallelMeans = factorState((state) => state.parallelMeans);
  const parallel95 = factorState((state) => state.parallel95);

  if (showUnrotatedFactorTable) {
    return (
      <div className="row-start-3 ml-1 mt-10">
        <HorstWarningMessage />
        {hasParallelAnalysisFinished ? (
          <>
            <UnrotatedFactorTable />
            <EigenTable />
            <ScreeContainer />
          </>
        ) : (
          <span>{'Calculating...'}</span>
        )}
      </div>
    );
  }

  if (showCentroidSpinner) {
    return <SpinnerCircle />;
  }

  if (!showUnrotatedFactorTable && !showCentroidSpinner) {
    return <div className="row-start-2" />;
  }
};

export default UnrotatedFactorsTransitionContainer;
