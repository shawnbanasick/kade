const formatConsensusArrayForDownload = (
  consensus05,
  consensus01,
  analysisOutput,
  sigFactorNumbersArray
) => {
  const chartText1 = "Consensus Statements";
  const chartText2 =
    "Those That Do Not Distinguish Between ANY Pair of Factors";
  const chartText3 =
    "All Listed Statements are Non-Significant at P > 0.01, and Those Flagged with an * are also Non-Significant at P > 0.05)";
  const chartText4 = "Significance";
  const chartText5 = "Statement";
  // const chartText6 = "Num";
  const chartText7 = "Statement Number";
  const chartText8 = "Z-score";
  const spacer = ["", ""];
  const outputLength = analysisOutput.length;
  const consensus05Length = consensus05.length;
  const consensus01Length = consensus01.length;

  const printArray = [];
  const printArray2 = [];
  const consensusSheetArray = [];
  const consensusSheetArray2 = [];

  // push headers
  const emptyLineObj = {};
  emptyLineObj["No."] = " ";
  emptyLineObj["SIG "] = " ";
  emptyLineObj["Statement "] = " ";
  emptyLineObj["Num "] = " ";

  for (let i = 0; i < outputLength; i += 1) {
    emptyLineObj[`Q-SV-${sigFactorNumbersArray[i]}`] = " ";
    emptyLineObj[`Z-SCR-${sigFactorNumbersArray[i]}`] = " ";
    emptyLineObj[`SIG${sigFactorNumbersArray[i]}`] = " ";
  }

  consensusSheetArray.push(
    spacer,
    [`${chartText1} -- ${chartText2}`],
    spacer,
    [chartText3],
    spacer,
    spacer
  );

  const line3Array = [];
  printArray.push(emptyLineObj);
  const printHeaderObj1 = {};
  printHeaderObj1["No."] = `${chartText1} -- ${chartText2}`;
  printArray.push(printHeaderObj1);
  printArray.push(emptyLineObj);
  const printHeaderObj2 = {};
  printHeaderObj2["No."] = chartText3;
  printArray.push(printHeaderObj2);
  printArray.push(emptyLineObj);
  printArray.push(emptyLineObj);
  const printHeaderObj4 = {};
  printHeaderObj4["No."] = chartText7;
  printHeaderObj4["SIG "] = chartText4;
  printHeaderObj4["Statement "] = chartText5;
  printHeaderObj4["Num "] = chartText7;

  line3Array.push(chartText7, chartText4, chartText5, chartText7);

  for (let j = 0; j < outputLength; j += 1) {
    printHeaderObj4[`Q-SV-${sigFactorNumbersArray[j]}`] = `${
      sigFactorNumbersArray[j]
    } Q-SV`;
    printHeaderObj4[`Z-SCR-${sigFactorNumbersArray[j]}`] = `${
      sigFactorNumbersArray[j]
    } ${chartText8}`;
    line3Array.push(
      `${sigFactorNumbersArray[j]} Q-SV`,
      `${sigFactorNumbersArray[j]} ${chartText8}`
    );
  }
  printArray.push(printHeaderObj4);
  consensusSheetArray.push(line3Array);

  let tempObj;
  let tempObj2;
  let kShift;
  let pShift;

  // push 05 statements
  for (let k = 0; k < consensus05Length; k += 1) {
    tempObj = {};
    const tempArray = [];
    kShift = consensus05[k];

    // cycle through statement numbers and get statement, factors q score and sort value from results object and set sig level to ""
    tempObj["No."] = kShift;
    // ["No."] = kShift;
    tempObj["SIG "] = "*";
    tempObj["Statement "] = analysisOutput[0][kShift - 1].sortStatement;
    tempObj["Num "] = kShift;

    tempArray.push(
      kShift,
      "*",
      analysisOutput[0][kShift - 1].sortStatement,
      kShift
    );

    for (let m = 0; m < outputLength; m += 1) {
      tempObj[`Q-SV-${sigFactorNumbersArray[m]}`] =
        analysisOutput[m][kShift - 1].sortValue;
      tempObj[`Z-SCR-${sigFactorNumbersArray[m]}`] =
        analysisOutput[m][kShift - 1].zScore;
      tempArray.push(
        analysisOutput[m][kShift - 1].sortValue,
        analysisOutput[m][kShift - 1].zScore
      );
    }
    printArray2.push(tempObj);
    consensusSheetArray2.push(tempArray);
  }

  // cycle through statement numbers and get statement, factors q score and sort value from results object and set sig level to "*"
  for (let p = 0; p < consensus01Length; p += 1) {
    const tempArray2 = [];
    tempObj2 = {};
    pShift = consensus01[p];

    tempObj2["No."] = pShift;
    tempObj2["SIG "] = "";
    tempObj2["Statement "] = analysisOutput[0][pShift - 1].sortStatement;
    tempObj2["Num "] = pShift;

    tempArray2.push(
      pShift,
      "",
      analysisOutput[0][pShift - 1].sortStatement,
      pShift
    );

    for (let q = 0; q < outputLength; q += 1) {
      tempObj2[`Q-SV-${sigFactorNumbersArray[q]}`] =
        analysisOutput[q][pShift - 1].sortValue;
      tempObj2[`Z-SCR-${sigFactorNumbersArray[q]}`] =
        analysisOutput[q][pShift - 1].zScore;
      tempArray2.push(
        analysisOutput[q][pShift - 1].sortValue,
        analysisOutput[q][pShift - 1].zScore
      );
    }
    printArray2.push(tempObj2);
    consensusSheetArray2.push(tempArray2);
  }

  const printArray3 = printArray2.sort((a, b) => a["No."] - b["No."]);

  consensusSheetArray2.sort((a, b) => {
    if (a[0] === b[0]) {
      return 0;
    }
    return a[0] < b[0] ? -1 : 1;
  });

  const finalArray = consensusSheetArray.concat(consensusSheetArray2);

  for (let r = 0; r < printArray3.length; r += 1) {
    printArray.push(printArray3[r]);
  }
  return [printArray, finalArray];
};

export default formatConsensusArrayForDownload;
