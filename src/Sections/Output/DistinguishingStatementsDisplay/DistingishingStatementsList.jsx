import React from "react";
import { view } from "react-easy-state";
import state from "../../../store";
import styled, { keyframes } from "styled-components";
import { Button } from "semantic-ui-react";
import DistStateListButtons from './DistStateListButtons';
import filterDistStateListData from './filterDistStateListData';
// import FactorViz from "./FactorViz";
// import refreshVizOptionsState from "./refreshVizOptionsState";
// import createFactorVizDataObjectForProps from "./createFactorVizDataObjectForProps";

const styles = {
  width: "100%",
  height: 1200,
  padding: 30,
  margin: 10
};

// todo - need to calculate dynamic height here for styles

// const tempdata = [{"factor":"Factor 1","distStates":[{"factor":"factor1","factorNum":1,"sortValue":-1,"statement":1,"sortStatement":"1. We accept improvements in status and power of lower class  ","sigLevelText":"P < 0.05","sigLevelRank":3},{"factor":"factor1","factorNum":1,"sortValue":-2,"statement":4,"sortStatement":"4. Men can expect fair treatment according to merit           ","sigLevelText":"P < 0.001","sigLevelRank":5},{"factor":"factor1","factorNum":1,"sortValue":1,"statement":5,"sortStatement":"5. Lower-class not revolutionary                              ","sigLevelText":"P < 0.15","sigLevelRank":1},{"factor":"factor1","factorNum":1,"sortValue":4,"statement":13,"sortStatement":"13. Encouraged to think of ourselves as competing for success  ","sigLevelText":"P < 0.2","sigLevelRank":0},{"factor":"factor1","factorNum":1,"sortValue":-1,"statement":17,"sortStatement":"17. We prefer companionship and helping hand                   ","sigLevelText":"P < 0.2","sigLevelRank":0},{"factor":"factor1","factorNum":1,"sortValue":-3,"statement":18,"sortStatement":"18. Some disdain for acquiring wealth for its own sake         ","sigLevelText":"P < 0.2","sigLevelRank":0},{"factor":"factor1","factorNum":1,"sortValue":-2,"statement":19,"sortStatement":"19. High value placed on protecting and promoting underdog     ","sigLevelText":"P < 0.05","sigLevelRank":3},{"factor":"factor1","factorNum":1,"sortValue":2,"statement":23,"sortStatement":"23. One law for the rich, another for the poor                 ","sigLevelText":"P < 0.05","sigLevelRank":3},{"factor":"factor1","factorNum":1,"sortValue":1,"statement":24,"sortStatement":"24. Lack of respect for the police, and law enforcement        ","sigLevelText":"P < 0.15","sigLevelRank":1},{"factor":"factor1","factorNum":1,"sortValue":3,"statement":27,"sortStatement":"27. Deep respect for the rich, the educated, the social elite  ","sigLevelText":"P < 0.01","sigLevelRank":4},{"factor":"factor1","factorNum":1,"sortValue":3,"statement":28,"sortStatement":"28. We are tolerant of popular opinion, don&#39;t like extremes","sigLevelText":"P < 0.2","sigLevelRank":0},{"factor":"factor1","factorNum":1,"sortValue":-4,"statement":30,"sortStatement":"30. Respect for civil liberties and minority rights            ","sigLevelText":"P < 0.001","sigLevelRank":5},{"factor":"factor1","factorNum":1,"sortValue":-2,"statement":31,"sortStatement":"31. Virtue tends to be its own reward                          ","sigLevelText":"P < 0.1","sigLevelRank":2},{"factor":"factor1","factorNum":1,"sortValue":-3,"statement":32,"sortStatement":"32. Position of depressed classes must be raised               ","sigLevelText":"P < 0.05","sigLevelRank":3}]},{"factor":"Factor 2","distStates":[{"factor":"factor2","factorNum":2,"sortValue":-3,"statement":3,"sortStatement":"3. Success in life by a previously deprived person is resented","sigLevelText":"P < 0.1","sigLevelRank":2},{"factor":"factor2","factorNum":2,"sortValue":-1,"statement":5,"sortStatement":"5. Lower-class not revolutionary                              ","sigLevelText":"P < 0.15","sigLevelRank":1},{"factor":"factor2","factorNum":2,"sortValue":0,"statement":6,"sortStatement":"6. Political goals relatively moderate, even conservative     ","sigLevelText":"P < 0.05","sigLevelRank":3},{"factor":"factor2","factorNum":2,"sortValue":-4,"statement":7,"sortStatement":"7. Those born to high place in society should retain it       ","sigLevelText":"P < 0.01","sigLevelRank":4},{"factor":"factor2","factorNum":2,"sortValue":-3,"statement":8,"sortStatement":"8. Person with wealth deserves place in high society          ","sigLevelText":"P < 0.1","sigLevelRank":2},{"factor":"factor2","factorNum":2,"sortValue":3,"statement":9,"sortStatement":"9. We try to eliminate privileged classes                     ","sigLevelText":"P < 0.0001","sigLevelRank":6},{"factor":"factor2","factorNum":2,"sortValue":-4,"statement":10,"sortStatement":"10. We accept aristocratic-type titles and other honors        ","sigLevelText":"P < 0.01","sigLevelRank":4},{"factor":"factor2","factorNum":2,"sortValue":-2,"statement":11,"sortStatement":"11. The government has its secrets, this is generally accepted ","sigLevelText":"P < 0.05","sigLevelRank":3},{"factor":"factor2","factorNum":2,"sortValue":1,"statement":12,"sortStatement":"12. Emphasis on publicity in political matters: no secrets     ","sigLevelText":"P < 0.2","sigLevelRank":0},{"factor":"factor2","factorNum":2,"sortValue":2,"statement":13,"sortStatement":"13. Encouraged to think of ourselves as competing for success  ","sigLevelText":"P < 0.2","sigLevelRank":0},{"factor":"factor2","factorNum":2,"sortValue":-2,"statement":14,"sortStatement":"14. Social status equated with manner of speech                ","sigLevelText":"P < 0.05","sigLevelRank":3},{"factor":"factor2","factorNum":2,"sortValue":0,"statement":23,"sortStatement":"23. One law for the rich, another for the poor                 ","sigLevelText":"P < 0.15","sigLevelRank":1},{"factor":"factor2","factorNum":2,"sortValue":2,"statement":24,"sortStatement":"24. Lack of respect for the police, and law enforcement        ","sigLevelText":"P < 0.15","sigLevelRank":1},{"factor":"factor2","factorNum":2,"sortValue":3,"statement":26,"sortStatement":"26. Worth of a man is judged by what he is, not by education   ","sigLevelText":"P < 0.05","sigLevelRank":3},{"factor":"factor2","factorNum":2,"sortValue":-2,"statement":27,"sortStatement":"27. Deep respect for the rich, the educated, the social elite  ","sigLevelText":"P < 0.1","sigLevelRank":2},{"factor":"factor2","factorNum":2,"sortValue":0,"statement":28,"sortStatement":"28. We are tolerant of popular opinion, don&#39;t like extremes","sigLevelText":"P < 0.01","sigLevelRank":4},{"factor":"factor2","factorNum":2,"sortValue":1,"statement":33,"sortStatement":"33. Emphasis is on getting ahead","sigLevelText":"P < 0.05","sigLevelRank":3}]}];

//     for (let i=0; i<tempdata.length; i++) {
//         tempdata[i]["distStates"].sort((a, b) => {
//           if (a.sigLevelRank === b.sigLevelRank) {
//             return a.factorNum - b.factorNum;
//           } else if (a.sigLevelRank > b.sigLevelRank) {
//             return -1;
//           } else if (a.sigLevelRank < b.sigLevelRank) {
//             return 1;
//           }
//         });
//     }

class DistinguishingStatementsList extends React.Component {
  render() {

    let sortKey = state.getState("distStateListSortKey");
    let threshold = state.getState("threshold");
    let displayData = filterDistStateListData(threshold, sortKey);
    // // const factorVizOptions = state.getState("factorVizOptions");
    // const factorData = createFactorVizDataObjectForProps(factorVizOptions);
    // const shouldDisplayFactorViz = state.getState(
    //   "displayFactorVisualizations"
    // );

    // if (shouldDisplayFactorViz) {

    return (
      <Container1>

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
            {displayData[index1]["distStates"].map((item, index) => (
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