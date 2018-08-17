import store from "../store";
import React, { Component } from "react";
import { easyComp } from "react-easy-state";
import FactorCorrelationsTable from "./Factor Info/FactorCorrelationsTable";
import FactorCharacteristicsTable from "./Factor Info/FactorCharacteristicsTable";
import StandardErrorsDifferencesTable from "./Factor Info/StandardErrorsDifferencesTable";
import { Transition } from 'semantic-ui-react';
import './OutputFactorTablesTransitionContainer.css';

class OutputFactorTablesTranstionContainer extends Component {
  render() {
    let showFactorCorrelationsTable = store.getState(
      "showFactorCorrelationsTable"
    );
    return (
      <Transition visible={ showFactorCorrelationsTable } animation="fade" duration={ 1000 }>
        <div className="section">
          <div className="outputFactorTables">
            <span className="outputFactorTablesSpan3">Correlations between Factor Scores</span>
            <FactorCorrelationsTable />
          </div>
          <div className="outputFactorTables">
            <span className="outputFactorTablesSpan3">Factor Characteristics</span>
            <FactorCharacteristicsTable />
          </div>
          <div className="outputFactorTables">
            <span className="outputFactorTablesSpan3">
                                Standard Errors for Differences in Factor Z-scores
                              </span>
            <span className="outputFactorTablesSpan2">
                    (Diagonal Entries Are S.E. Within Factors)
                  </span>
            <StandardErrorsDifferencesTable />
          </div>
        </div>
      </Transition>
      );
  }
}

export default easyComp(OutputFactorTablesTranstionContainer);
