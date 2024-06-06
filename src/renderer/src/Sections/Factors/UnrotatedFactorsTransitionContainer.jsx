import styled from 'styled-components';
import SpinnerCircle from './SpinnerCircle';
import ScreeContainer from './FactorScreePlot/ScreeContainer';
import EigenTable from './FactorTableEigen/EigenTable';
import UnrotatedFactorTable from './FactorTable/UnrotatedFactorTable';
import HorstWarningMessage from './factorSelection/HorstWarningMessage';
import factorState from '../GlobalState/factorState';

const UnrotatedFactorsTransitionContainer = () => {
  // getState
  const showUnrotatedFactorTable = factorState((state) => state.showUnrotatedFactorTable);
  const showCentroidSpinner = factorState((state) => state.showCentroidSpinner);

  if (showUnrotatedFactorTable) {
    return (
      <Container>
        <HorstWarningMessage />
        <UnrotatedFactorTable />
        <EigenTable />
        <ScreeContainer />
      </Container>
    );
  }
  if (showCentroidSpinner) {
    return <SpinnerCircle />;
  }
  if (!showUnrotatedFactorTable && !showCentroidSpinner) {
    return <EmptyContainer />;
  }
};

export default UnrotatedFactorsTransitionContainer;

const Container = styled.div`
  grid-row-start: 3;
  margin-left: 70px;
  margin-top: 40px;
`;

const EmptyContainer = styled.div`
  grid-row-start: 2;
`;

// height: 300px;
