import React from "react";
import { view } from "react-easy-state";
import state from "../../../store";
import styled, { keyframes } from "styled-components";
import { Button } from "semantic-ui-react";
import DistStateListButtons from "./DistStateListButtons";
import filterDistStateListData from "./filterDistStateListData";
import DistStateListSortByButtons from "./DistStateListSortByButtons";

const styles = {
  width: "100%",
  height: 1200,
  padding: 30,
  margin: 10
};

// todo - need to calculate dynamic height here for styles

class DistinguishingStatementsList extends React.Component {
  render() {
    const sortKey = state.getState("distStateListSortKey");
    const threshold = state.getState("threshold");
    const displayData = filterDistStateListData(threshold, sortKey);
    // // const factorVizOptions = state.getState("factorVizOptions");
    // const factorData = createFactorVizDataObjectForProps(factorVizOptions);
    // const shouldDisplayFactorViz = state.getState(
    //   "displayFactorVisualizations"
    // );

    // if (shouldDisplayFactorViz) {

    return (
      <Container1>
        <DistStateListSortByButtons />
        <DistStateListButtons />

        {displayData.map((factorItem, index1) => (
          <React.Fragment key={`key${index1.toString()}`}>
            <h2>{factorItem.factor}</h2>
            <table>
              <tbody>
                <tr>
                  <th>Threshold</th>
                  <th>Q Sort Value</th>
                  <th>State. No.</th>
                  <th>Statement</th>
                </tr>
                {displayData[index1].distStates.map((item, index) => (
                  <tr key={`key${index.toString()}`}>
                    <td>{item.sigLevelText}</td>
                    <td className="num">{item.sortValue}</td>
                    <td className="num">{item.statement}</td>
                    <td>{item.sortStatement}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </React.Fragment>
        ))}
      </Container1>
    );
    // }
    // return null;
  }
}

export default view(DistinguishingStatementsList);

const Container1 = styled.div`
  padding-bottom: 150px;

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

  .num {
    text-align: center;
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
