import xor from "lodash/xor";
import uniq from "lodash/uniq";
import flatten from "lodash/flatten";
import cloneDeep from "lodash/cloneDeep";
import difference from "lodash/difference";
import state from "../../../store";
import evenRound from "../../../Utils/evenRound";
import reduceDistingArray from "./3_reduceDistingArray";
import formatDistingArrayForDownload from "./3_formatDistinguishingArrayForDownload";
import formatConsensusArrayForDownload from "./3_formatConsensusArrayForDownload";
import addDistinguishingSymbolsToData from "../FactorVisualizations/addDistinguishingSymbolsToData";

const pushDistinguishingStatementsToOutput = function(
  sheetNames,
  output,
  sigSortsArray,
  analysisOutput,
  stndErrorDiffDataArray,
  stndErrorDiffDataDistingArray,
  sigFactorNumbersArray,
  outputData,
  sheetNamesXlsx,
  colSizes
) {
  const chartText1 = "Dist State ";
  const chartText2 = "Consensus Statements";
  const maxStatementLength = state.getState("maxStatementLength");
  const userSelectedFactors = state.getState("userSelectedFactors");
  const userSelectedDistStateSigLevel1 = state.getState(
    "userSelectedDistStateSigLevel1"
  ); // upper level
  const userSelectedDistStateSigLevel2 = state.getState(
    "userSelectedDistStateSigLevel2"
  ); // lower level

  // property to count loop iterations for assigning significance * in disting factor output
  formatDistingArrayForDownload.calledTimes = 0;

  // loop to set up worksheet names and push into output array
  for (let i = 0; i < sigSortsArray.length; i++) {
    let factorNumber = sigSortsArray[i]["Factor Number"];
    const factorNumber2 =
      factorNumber.charAt(0).toUpperCase() + factorNumber.slice(1);
    const number = factorNumber2.substring(factorNumber2.length - 1);
    const factorNumber3 = factorNumber2.slice(0, -1);
    factorNumber = `${factorNumber3} ${number}`;

    sheetNamesXlsx.push(chartText1 + factorNumber);

    // set up col widths for excel output - todo - change maxStatementLength?
    const columns = [
      {
        wch: 8
      },
      {
        wch: maxStatementLength
      },
      {
        wch: 8
      }
    ];
    for (let tt = 0, ttLen = userSelectedFactors.length; tt < ttLen; tt++) {
      columns.push(
        {
          wch: 8
        },
        {
          wch: 8
        },
        {
          wch: 8
        }
      );
    }
    colSizes.push(columns);
  }

  // starting calcs for distinguishing factors
  let sedComparisonValue, j, k, m;
  let consensusStatementComparisonArray05 = [];
  let consensusStatementComparisonArray01 = [];
  const distStatementDataVizArray = [];
  const masterDistingStatementNumbersArray05 = [];
  const masterDistingStatementNumbersArray01 = [];
  const distStatementsTableArray = [];
  let array0001;
  let array0005;
  let array001;
  let array005;
  let array01;
  let array05;
  let array1;
  let array15;
  let array2;
  // looping through all factors to determine if distinguishing!
  // todo - create if statement for case of only two sig factors-bypass processing of second c 4894
  for (j = 0; j < sigSortsArray.length; j++) {
    // factor j
    // looping through all statements in each j factor
    const distingStatementsTransferArray05 = [];
    const distingStatementsTransferArray01 = [];
    const consensusStatementTransferArray05 = [];
    const consensusStatementTransferArray01 = [];

    const distStatementsTableTempArray = [];

    for (k = 0; k < analysisOutput[0].length; k++) {
      // looping through each statement's other factor zScores to compare
      // also grabbing the appropriate SED value for each comparison
      let sig05 = false;
      const sig05Array = [];
      let sig01 = false;
      const sig01Array = [];
      let newStatementNum;
      const distStatementsTableTempObj = {};
      array0001 = [];
      array0005 = [];
      array001 = [];
      array005 = [];
      array01 = [];
      array05 = [];
      array1 = [];
      array15 = [];
      array2 = [];

      for (m = 0; m < sigSortsArray.length; m++) {
        // factor m
        // check to avoid comparison with self
        if (analysisOutput[j][k].factor === analysisOutput[m][k].factor) {
        } else {
          // loop through SED array to find comparison value
          sedComparisonValue = null;

          for (let p = 0; p < stndErrorDiffDataDistingArray.length; p++) {
            const searchVal1 = stndErrorDiffDataDistingArray[p][0];
            const searchVal2 = stndErrorDiffDataDistingArray[p][1];
            const iteratorJShift = sigFactorNumbersArray[j];
            const iteratorMShift = sigFactorNumbersArray[m];

            if (
              searchVal1 === iteratorJShift &&
              searchVal2 === iteratorMShift
            ) {
              sedComparisonValue = stndErrorDiffDataDistingArray[p][2];
            }
          }

          /* 
          begin comparisons
           const lookupArray = [3.906, 3.481, 3.291, 2.807, 2.575, 1.96, 1.645, 1.44, 1.28];
          
           const pValuesTextArray = [
            "P < 0.0001",
            "P < 0.0005",
            "P < 0.001",
            "P < 0.005"
            "P < 0.01",
            "P < 0.05",
            "P < 0.1",
            "P < 0.15"
            "P < 0.2"
          ];
          */

          distStatementsTableTempObj.factor = analysisOutput[j][k].factor;
          distStatementsTableTempObj.factorNum = j + 1;
          distStatementsTableTempObj.sortValue = analysisOutput[j][k].sortValue;
          distStatementsTableTempObj.statement = analysisOutput[j][k].statement;
          distStatementsTableTempObj.sortStatement =
            analysisOutput[j][k].sortStatement;

          const testValue = Math.abs(
            analysisOutput[j][k].zScore - analysisOutput[m][k].zScore
          );

          // P < 0.0001 Level
          if (testValue >= sedComparisonValue * 3.906) {
            array0001.push(true);
          }
          // P < 0.0005 Level
          if (testValue >= sedComparisonValue * 3.481) {
            array0005.push(true);
          }
          // P < 0.001 Level
          if (testValue >= sedComparisonValue * 3.291) {
            array001.push(true);
          }
          // P < 0.005 Level
          if (testValue >= sedComparisonValue * 2.807) {
            array005.push(true);
          }
          // P < 0.01 Level
          if (testValue >= sedComparisonValue * 2.575) {
            array01.push(true);
          }
          // P < 0.05 Level
          if (testValue >= sedComparisonValue * 1.96) {
            array05.push(true);
          }
          // P < 0.1 Level
          if (testValue >= sedComparisonValue * 1.645) {
            array1.push(true);
          }
          // P < 0.15 Level
          if (testValue >= sedComparisonValue * 1.44) {
            array15.push(true);
          }
          // P < 0.2 Level
          if (testValue >= sedComparisonValue * 1.28) {
            array2.push(true);
          }

          // User selections
          if (
            Math.abs(
              analysisOutput[j][k].zScore - analysisOutput[m][k].zScore
            ) >=
            sedComparisonValue * userSelectedDistStateSigLevel2 // 1.96
          ) {
            analysisOutput[j][k].zScore = evenRound(
              analysisOutput[j][k].zScore,
              2
            );
            sig05 = true;
            sig05Array.push(sig05);
          }

          if (
            Math.abs(
              analysisOutput[j][k].zScore - analysisOutput[m][k].zScore
            ) >=
            sedComparisonValue * userSelectedDistStateSigLevel1 // 2.58
          ) {
            analysisOutput[j][k].zScore = evenRound(
              analysisOutput[j][k].zScore,
              2
            );
            sig01 = true;
            sig01Array.push(sig01);
          }
        }
      }

      switch (true) {
        // P < 0.0001 Level
        case array0001.length === sigFactorNumbersArray.length - 1:
          distStatementsTableTempObj.sigLevelText = "P < 0.0001";
          distStatementsTableTempObj.sigLevelRank = 8;
          distStatementsTableTempArray.push(distStatementsTableTempObj);
          break;
        // P < 0.0005 Level
        case array0005.length === sigFactorNumbersArray.length - 1:
          distStatementsTableTempObj.sigLevelText = "P < 0.0005";
          distStatementsTableTempObj.sigLevelRank = 7;
          distStatementsTableTempArray.push(distStatementsTableTempObj);
          break;
        // P < 0.001 Level
        case array001.length === sigFactorNumbersArray.length - 1:
          distStatementsTableTempObj.sigLevelText = "P < 0.001";
          distStatementsTableTempObj.sigLevelRank = 6;
          distStatementsTableTempArray.push(distStatementsTableTempObj);
          break;
        // P < 0.005 Level
        case array005.length === sigFactorNumbersArray.length - 1:
          distStatementsTableTempObj.sigLevelText = "P < 0.005";
          distStatementsTableTempObj.sigLevelRank = 5;
          distStatementsTableTempArray.push(distStatementsTableTempObj);
          break;
        // P < 0.01 Level
        case array01.length === sigFactorNumbersArray.length - 1:
          distStatementsTableTempObj.sigLevelText = "P < 0.01";
          distStatementsTableTempObj.sigLevelRank = 4;
          distStatementsTableTempArray.push(distStatementsTableTempObj);
          break;
        // P < 0.05 Level
        case array05.length === sigFactorNumbersArray.length - 1:
          distStatementsTableTempObj.sigLevelText = "P < 0.05";
          distStatementsTableTempObj.sigLevelRank = 3;
          distStatementsTableTempArray.push(distStatementsTableTempObj);
          break;
        // P < 0.1 Level
        case array1.length === sigFactorNumbersArray.length - 1:
          distStatementsTableTempObj.sigLevelText = "P < 0.1";
          distStatementsTableTempObj.sigLevelRank = 2;
          distStatementsTableTempArray.push(distStatementsTableTempObj);
          break;
        // P < 0.15 Level
        case array15.length === sigFactorNumbersArray.length - 1:
          distStatementsTableTempObj.sigLevelText = "P < 0.15";
          distStatementsTableTempObj.sigLevelRank = 1;
          distStatementsTableTempArray.push(distStatementsTableTempObj);
          break;
        // P < 0.2 Level
        case array2.length === sigFactorNumbersArray.length - 1:
          distStatementsTableTempObj.sigLevelText = "P < 0.2";
          distStatementsTableTempObj.sigLevelRank = 0;
          distStatementsTableTempArray.push(distStatementsTableTempObj);
          break;
        // not distinguishing
        default:
      }

      newStatementNum = k + 1;

      if (sig05Array.length === sigFactorNumbersArray.length - 1) {
        distingStatementsTransferArray05.push(newStatementNum);
      }

      if (sig01Array.length === sigFactorNumbersArray.length - 1) {
        distingStatementsTransferArray01.push(newStatementNum);
      }

      if (sig05Array.length === 0) {
        consensusStatementTransferArray05.push(newStatementNum);
      }

      if (sig01Array.length === 0) {
        consensusStatementTransferArray01.push(newStatementNum);
      }
    }

    const tempPushObj = {
      factor: `Factor ${j + 1}`,
      distStates: distStatementsTableTempArray
    };

    distStatementsTableArray.push(tempPushObj);

    const distingStatementsTransferArray05b = uniq(
      distingStatementsTransferArray05,
      true
    );
    const distingStatementsTransferArray01b = uniq(
      distingStatementsTransferArray01,
      true
    );
    const distingStatementsTransferArray05c = difference(
      distingStatementsTransferArray05b,
      distingStatementsTransferArray01b
    );

    masterDistingStatementNumbersArray05.push(
      distingStatementsTransferArray05c
    );
    masterDistingStatementNumbersArray01.push(
      distingStatementsTransferArray01b
    );

    consensusStatementComparisonArray05.push(consensusStatementTransferArray05);
    consensusStatementComparisonArray01.push(consensusStatementTransferArray01);

    const factorNumber = sigFactorNumbersArray[j];

    const formattedDistingStatements = formatDistingArrayForDownload(
      distingStatementsTransferArray01b,
      distingStatementsTransferArray05c,
      factorNumber,
      analysisOutput,
      sigFactorNumbersArray
    );

    distStatementDataVizArray.push(formattedDistingStatements[0]);

    outputData.push(formattedDistingStatements[1]);
  } // end of J loop

  state.setState({
    masterDistingStatementNumbersArray01
  });
  state.setState({
    masterDistingStatementNumbersArray05
  });

  // ******
  // develop consensus statement data
  // ******

  do {
    consensusStatementComparisonArray05 = reduceDistingArray(
      consensusStatementComparisonArray05
    );
  } while (consensusStatementComparisonArray05.length > 1);

  do {
    consensusStatementComparisonArray01 = reduceDistingArray(
      consensusStatementComparisonArray01
    );
  } while (consensusStatementComparisonArray01.length > 1);

  const consensus05 = flatten(consensusStatementComparisonArray05);
  const consensusStatementComparisonArray01b = flatten(
    consensusStatementComparisonArray01
  );

  const consensus01 = xor(consensus05, consensusStatementComparisonArray01b);

  state.setState({
    consensus05Statements: consensus05,
    consensus01Statements: consensus01
  });

  sheetNamesXlsx.push(chartText2);

  // set up col widths for excel output
  const columns2 = [
    {
      wch: 12
    },
    {
      wch: 12
    },
    {
      wch: maxStatementLength
    },
    {
      wch: 12
    }
  ];
  for (let ttt = 0, tttLen = userSelectedFactors.length; ttt < tttLen; ttt++) {
    columns2.push(
      {
        wch: 12
      },
      {
        wch: 15
      },
      {
        wch: 15
      }
    );
  }
  colSizes.push(columns2);

  const formattedConsensusStatements = formatConsensusArrayForDownload(
    consensus05,
    consensus01,
    analysisOutput,
    sigFactorNumbersArray
  );
  state.setState({
    formattedConsensusStatements: formattedConsensusStatements[0]
  });

  const analysisOutput2 = cloneDeep(analysisOutput);

  outputData.push(formattedConsensusStatements[1]);

  // add all distinguishing symbols now, so no need to loop through later
  const outputForDataVizWithSig = addDistinguishingSymbolsToData(
    analysisOutput2,
    distStatementDataVizArray,
    formattedConsensusStatements[0]
  );

  state.setState({
    distStatementDataVizArray,
    outputForDataViz: outputForDataVizWithSig,
    distStateListData: distStatementsTableArray
  });

  // console.log(
  //   "TCL: distStatementsTableArray",
  //   JSON.stringify(distStatementsTableArray)
  // );

  return [sheetNames, output, outputData, sheetNamesXlsx, colSizes];
};

export default pushDistinguishingStatementsToOutput;
