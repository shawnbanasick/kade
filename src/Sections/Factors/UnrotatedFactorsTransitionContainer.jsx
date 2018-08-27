import React from "react";
import { view } from "react-easy-state";
import styled from "styled-components";
import state from "../../store";
import Chart from "./FactorScreePlot/Chart";
// import { Transition } from 'semantic-ui-react';
import EigenTable from "./FactorTableEigen/EigenTable";
import CentroidTable from "./FactorTable/CentroidTable";

class UnrotatedFactorsTransitionContainer extends React.Component {
  componentDidUpdate() {
    state.setState({
      showCentroidSpinner: false
    });
  }
  render() {
    const showUnrotatedFactorTable = state.getState("showUnrotatedFactorTable");
    // let showEigenvaluesTable = store.getState("showEigenvaluesTable");
    // let showScreePlot = store.getState("showScreePlot");
    {
      /* <Transition visible={ showUnrotatedFactorTable } animation="fade" duration={ 10 }> */
    }
    // {/*  </Transition> */}

    if (showUnrotatedFactorTable) {
      return (
        <Container>
          <CentroidTable />
          <EigenTable />
          <Chart />
        </Container>
        );
    }
    return (
      <EmptyContainer />
      );
  }
}

export default view(UnrotatedFactorsTransitionContainer);

const Container = styled.div`
  grid-row-start: 2;
`;

const EmptyContainer = styled.div`
  grid-row-start: 2;  
  width: 100%;
  height: 300px;
`;

/* 
the empty div fixes a problem with the 
dropdown menu getting cut off
*/