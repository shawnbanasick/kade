import state from "../../../store";
import currentDate1 from "../../../Utils/currentDate1";
import currentTime1 from "../../../Utils/currentTime1";
import exportToCsv from "../../Output/downloadCsvLogic/exportToCsv";

const capitalizeFirstLetter = string =>
  string.charAt(0).toUpperCase() + string.slice(1);

const dowloadDistStates = () => {
  const distStateListData = state.getState("distStateListData");
  const userSelectedFactors = state.getState("userSelectedFactors");
  const timeStamp = `${currentDate1()}_${currentTime1()}`;
  const projectName = state.getState("projectName");

  const downloadArray = [];

  // sort by sig level
  for (let i = 0; i < distStateListData.length; i++) {
    distStateListData[i].distStates.sort((a, b) => {
      if (a.sigLevelRank === b.sigLevelRank) {
        return a.factorNum - b.factorNum;
      } else if (a.sigLevelRank > b.sigLevelRank) {
        return -1;
      } else if (a.sigLevelRank < b.sigLevelRank) {
        return 1;
      }
    });
  }

  for (let j = 0; j < userSelectedFactors.length; j++) {
    const userSelectedFactor = capitalizeFirstLetter(userSelectedFactors[j]);
    downloadArray.push([userSelectedFactor, "", "", ""]);
    downloadArray.push([
      "Threshold",
      "Q Sort Value",
      "State. No.",
      "Statement"
    ]);

    const loopArray = distStateListData[j].distStates;

    for (let k = 0; k < loopArray.length; k++) {
      const tempArray = [];
      const sigLevelText = loopArray[k].sigLevelText;
      const sortValue = loopArray[k].sortValue;
      const statement = loopArray[k].statement;
      const sortStatement = loopArray[k].sortStatement;
      tempArray.push(sigLevelText, sortValue, statement, sortStatement);
      downloadArray.push(tempArray);
    }
    // add spacer
    downloadArray.push(["", "", "", ""]);
  }

  const fileName = `KADE_dist_state_list_${projectName}_${timeStamp}.csv`;

  exportToCsv(fileName, downloadArray);

  // console.log(JSON.stringify(downloadArrayString));
};

export default dowloadDistStates;
