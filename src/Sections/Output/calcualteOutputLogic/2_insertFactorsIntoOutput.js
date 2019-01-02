import state from "../../../store";

const insertFactorsIntoOutput = function(
  sheetNames,
  output,
  analysisOutput,
  outputData,
  sheetNamesXlsx,
  colSizes
) {
  const appendText1 = "Sorts Weight";
  // let appendText2 = "Sorts Corr";
  const appendText3 = "Statement Number";
  const appendText4 = "Statement";
  const appendText5 = "Z-score";
  // let appendText6 = resources[language].translation["Sort Values"];
  const appendText7 = "Raw Sort";
  const appendText8 = "Sort Values";
  const appendText9 = "Sorts Correlations";
  const appendText10 = "Factor Scores for ";

  const sheetNamesHolder1 = state.getState("sheetNamesHolder1");
  const sheetNamesHolder2 = state.getState("sheetNamesHolder2");
  const sheetNamesHolder3 = state.getState("sheetNamesHolder3");

  const factorWeightFactorArray = state.getState("factorWeightFactorArrayHolder");
  const miniCorrelationArray = state.getState("miniCorrelationArrayHolder");
  const synFactorArray1 = state.getState("synFactorArray1Holder");
  const compositeFactorMasterArray = state.getState("compositeFactorMasterArray");
  const userSelectedFactors = state.getState("userSelectedFactors");
  const sigSortsArray = state.getState("sigSortsArray");
  const maxStatementLength = state.getState("maxStatementLength");
  const spacer = ["", ""];

  for (let ii = 0, iiLen = userSelectedFactors.length; ii < iiLen; ii++) {
    const sheetHeaderArrayPartial = [
      appendText3,
      appendText4,
      appendText5,
      appendText8
    ];

    // set weights name
    sheetNamesXlsx.push(sheetNamesHolder1[ii].sheetid);

    // set weights columns
    const columns = [
      {
        wch: 8
      },
      {
        wch: 8
      }
    ];
    colSizes.push(columns);

    // set weights sheet
    factorWeightFactorArray[ii].unshift(
      spacer,
      [userSelectedFactors[ii], appendText1],
      spacer
    );
    outputData.push(factorWeightFactorArray[ii]);

    // set sorts corr name
    sheetNamesXlsx.push(sheetNamesHolder2[ii].sheetid);

    // set sorts corr cols
    const columns2 = [
      {
        wch: 8
      }
    ];
    for (let ss = 0, ssLen = userSelectedFactors.length; ss < ssLen; ss++) {
      columns2.push({
        wch: 8
      });
    }
    colSizes.push(columns2);

    // set sorts corr sheet
    miniCorrelationArray[ii].unshift(
      spacer,
      [userSelectedFactors[ii], appendText9],
      spacer
    );
    outputData.push(miniCorrelationArray[ii]);

    // set factor sheet name
    sheetNamesXlsx.push(sheetNamesHolder3[ii].sheetid);

    // set factor sheet cols
    const columns3 = [
      {
        wch: 8
      },
      {
        wch: maxStatementLength
      },
      {
        wch: 9
      },
      {
        wch: 12
      }
    ];
    for (
      let tt = 0, ttLen = sigSortsArray[ii].SigSorts.length;
      tt < ttLen;
      tt++
    ) {
      columns3.push({
        wch: 12
      });
    }
    colSizes.push(columns3);

    // set factor sheets
    // re-sort to zScore
    compositeFactorMasterArray[ii].sort((a, b) => {
      if (a[2] === b[2]) {
        return a[0] < b[0] ? -1 : 1;
      }
      return b[2] < a[2] ? -1 : 1;

    });

    for (
      let jj = 0, jjLen = sigSortsArray[ii].SigSorts.length;
      jj < jjLen;
      jj++
    ) {
      sheetHeaderArrayPartial.push(
        `${appendText7  } ${  sigSortsArray[ii].SigSorts[jj]}`
      );
    }
    compositeFactorMasterArray[ii].unshift(
      spacer,
      ["", `${appendText10  } ${  userSelectedFactors[ii]}`],
      spacer,
      sheetHeaderArrayPartial
    );
    outputData.push(compositeFactorMasterArray[ii]);
  } // end big loop

  for (let i = 0, iLen = factorWeightFactorArray.length; i < iLen; i++) {
    sheetNames.push(sheetNamesHolder1[i]);
    sheetNames.push(sheetNamesHolder2[i]);
    sheetNames.push(sheetNamesHolder3[i]);
    output.push(factorWeightFactorArray[i]);
    output.push(miniCorrelationArray[i]);
    output.push(synFactorArray1[i]);
  }

  return [
    sheetNames,
    output,
    analysisOutput,
    outputData,
    sheetNamesXlsx,
    colSizes
  ];
};

export default insertFactorsIntoOutput;
