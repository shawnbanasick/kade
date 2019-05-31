import React from "react";
import { view } from "react-easy-state";
import state from "../../../store";
import styled from "styled-components";
// import { Button } from "semantic-ui-react";
import DistStateListButtons from "./DistStateListButtons";
import filterDistStateListData from "./filterDistStateListData";
import DistStateListSortByButtons from "./DistStateListSortByButtons";

// const styles = {
//   width: "100%",
//   height: 1200,
//   padding: 30,
//   margin: 10
// };

// todo - need to calculate dynamic height here for styles

class DistinguishingStatementsList extends React.Component {
  render() {
    const sortKey = state.getState("distStateListSortKey");
    const threshold = state.getState("threshold");
    const displayData = filterDistStateListData(threshold, sortKey);
    const showFactorCorrelationsTable = state.getState(
      "showFactorCorrelationsTable"
    );
    // // const factorVizOptions = state.getState("factorVizOptions");
    // const factorData = createFactorVizDataObjectForProps(factorVizOptions);
    // const shouldDisplayFactorViz = state.getState(
    //   "displayFactorVisualizations"
    // );

    if (showFactorCorrelationsTable) {
      return (
        <Container1>
          <h2>
            Interactive List &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(Output thresholds
            are set in the &quot;Options&quot; section)
          </h2>
          <DistStateListSortByButtons />
          <DistStateListButtons />

          {displayData.map((factorItem, index1) => (
            <React.Fragment key={`key${index1.toString()}`}>
              <h2>{factorItem.userSelectedFactor}</h2>
              <table>
                <tbody>
                  <tr>
                    <th>Threshold</th>
                    <th>Z scr.</th>
                    <th>Q Sort Value</th>
                    <th>State. No.</th>
                    <th>Statement</th>
                  </tr>
                  {displayData[index1].distStates.map((item, index) => (
                    <tr key={`key${index.toString()}`}>
                      <td>{item.sigLevelText}</td>
                      <td className="zScr">{item.zScore}</td>
                      <td className="num">{item.sortValue}</td>
                      <td className="num">{item.statement}</td>
                      <td className="statement">{item.sortStatement}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </React.Fragment>
          ))}
        </Container1>
      );
    }
    return (
      <h2 style={{ marginTop: 50, marginLeft: 50 }}>
        Select factors for output in the Options tab
      </h2>
    );
  }
}

export default view(DistinguishingStatementsList);

const Container1 = styled.div`
  padding-bottom: 150px;
  padding-right: 20px;

  table,
  th,
  td {
    border: 1px solid black;
    border-collapse: collapse;
  }

  th,
  td {
    padding: 5px;
  }

  tr:nth-child(even) {
    background-color: #eee;
  }

  tr:hover {
    background-color: rgba(131, 202, 254, 0.6);
  }

  .zScr {
    text-align: right;
  }

  .num {
    text-align: center;
  }

  .statement {
    min-width: 600px;
  }
`;

const StyledWrapper = styled.div`
  display: flex;

  .wrapper1 {
    border: 1px solid black;
    box-shadow: 0 2px 2px 0 black;

    &:hover {
      border: 1px solid black;
      box-shadow: 0 2px 2px 0 black;
    }

    &:active {
      box-shadow: 0 0 1px 0 black inset;
    }
  }
`;
