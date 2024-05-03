import React from 'react';
import { view } from '@risingstack/react-easy-state';
import styled from 'styled-components';
import SpinnerCircle from './SpinnerCircle';
import ScreeContainer from './FactorScreePlot/ScreeContainer';
import EigenTable from './FactorTableEigen/EigenTable';
import UnrotatedFactorTable from './FactorTable/UnrotatedFactorTable';
import HorstWarningMessage from './factorSelection/HorstWarningMessage';
import getFactorState from '../GlobalState/getFactorState';

const UnrotatedFactorsTransitionContainer = () => {
  // getState
  const showUnrotatedFactorTable = getFactorState('showUnrotatedFactorTable');
  const showCentroidSpinner = getFactorState('showCentroidSpinner');

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

export default view(UnrotatedFactorsTransitionContainer);

const Container = styled.div`
  grid-row-start: 3;
  margin-left: 70px;
  margin-top: 40px;
`;

const EmptyContainer = styled.div`
  grid-row-start: 2;
`;

// height: 300px;
