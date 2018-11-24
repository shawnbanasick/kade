import xor from "lodash/xor";
import uniq from "lodash/uniq";
import flatten from "lodash/flatten";
import cloneDeep from "lodash/cloneDeep";
import difference from "lodash/difference";
import store from "../../../store";
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
  const maxStatementLength = store.getState("maxStatementLength");
  const userSelectedFactors = store.getState("userSelectedFactors");

  // property to count loop iterations for assigning significance * in disting factor output
  formatDistingArrayForDownload.calledTimes = 0;

  // loop to set up worksheet names and push into output array
  for (let i = 0; i < sigSortsArray.length; i++) {
    let factorNumber = sigSortsArray[i]["Factor Number"];
    const factorNumber2 =
      factorNumber.charAt(0).toUpperCase() + factorNumber.slice(1);
    const number = factorNumber2.substring(factorNumber2.length - 1);
    const factorNumber3 = factorNumber2.slice(0, -1);
    factorNumber = `${factorNumber3  } ${  number}`;

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

  // looping through all factors to determine if distinguishing!
  // todo - create if statement for case of only two sig factors-bypass processing of second c 4894
  for (j = 0; j < sigSortsArray.length; j++) {
    // factor j
    // looping through all statements in each j factor
    const distingStatementsTransferArray05 = [];
    const distingStatementsTransferArray01 = [];
    const consensusStatementTransferArray05 = [];
    const consensusStatementTransferArray01 = [];

    for (k = 0; k < analysisOutput[0].length; k++) {
      // looping through each statement's other factor zScores to compare
      // also grabbing the appropriate SED value for each comparison
      let sig05 = false;
      const sig05Array = [];
      let sig01 = false;
      const sig01Array = [];
      let newStatementNum;

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

          if (
            Math.abs(
              analysisOutput[j][k].zScore - analysisOutput[m][k].zScore
            ) >=
            sedComparisonValue * 1.96
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
            sedComparisonValue * 2.58
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
  }

  store.setState({
    masterDistingStatementNumbersArray01
  });
  store.setState({
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

  store.setState({
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
  store.setState({
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

  store.setState({
    distStatementDataVizArray,
    outputForDataViz: outputForDataVizWithSig
  });

  return [sheetNames, output, outputData, sheetNamesXlsx, colSizes];
};

export default pushDistinguishingStatementsToOutput;
