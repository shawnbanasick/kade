import React, { Component } from "react";
import { view } from "react-easy-state";
import { Transition } from "semantic-ui-react";
import store from "../../store";
import FactorCorrelationsTable from "./Factor Info/FactorCorrelationsTable";
import FactorCharacteristicsTable from "./Factor Info/FactorCharacteristicsTable";
import StandardErrorsDifferencesTable from "./Factor Info/StandardErrorsDifferencesTable";
// import './OutputFactorTablesTransitionContainer.css';

class OutputFactorTablesTranstionContainer extends Component {
  render() {
    const showFactorCorrelationsTable = store.getState(
      "showFactorCorrelationsTable"
    );
    return (
      <Transition
        visible={showFactorCorrelationsTable}
        animation="fade"
        duration={1000}
      >
        <div className="section">
          <div className="outputFactorTables">
            <span className="outputFactorTablesSpan3">
              Correlations between Factor Scores
            </span>
            <FactorCorrelationsTable />
          </div>
          <div className="outputFactorTables">
            <span className="outputFactorTablesSpan3">
              Factor Characteristics
            </span>
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

export default view(OutputFactorTablesTranstionContainer);

/*
.outputFactorTables {
    margin-top: 50px;
    display: flex;
    flex-direction: column;
}

.outputFactorTablesSpan2 {
    text-align: left;
    margin-bottom: 5px;
    font-size: 16px;
    line-height: 18px;
}

.outputFactorTablesSpan3 {
    text-align: left;
    font-size: 26px;
    margin-bottom: 5px;
}
*/
