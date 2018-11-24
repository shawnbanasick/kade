import store from "../../../store";
import evenRound from "../../../Utils/evenRound";

const pushFactorCharacteristicsToOutput = function(
  sheetNames,
  output,
  analysisOutput,
  sigFactorNumbersArray,
  outputData,
  sheetNamesXlsx,
  colSizes
) {
  const chartText1 = "Factor Characteristics";
  // var chartText2 = "Factor Number";
  const chartText3 = "No. of Defining Variables";
  const chartText4 = "Avg. Rel. Coef.";
  const chartText5 = "Composite Reliability";
  const chartText6 = "S.E. of Factor Z-scores";
  const userSelectedFactors = store.getState("userSelectedFactors");
  const sigSortsArray = store.getState("sigSortsArray");
  const spacer = ["", ""];

  sheetNamesXlsx.push(chartText1);

  // set factor sheet col widths
  const columns = [
    {
      wch: 20
    }
  ];
  for (let tt = 0, ttLen = userSelectedFactors.length; tt < ttLen; tt++) {
    columns.push({
      wch: 8
    });
  }
  colSizes.push(columns);

  const factorCharacteristicsSheetArray = [];

  // line 1 - factor labels
  const line1Array = [""];
  const line1Arrayb = line1Array.concat(userSelectedFactors);
  factorCharacteristicsSheetArray.push(line1Arrayb);

  // line 2 - No. of Defining Variables
  const line2Array = [chartText3];
  for (let j = 0; j < sigSortsArray.length; j++) {
    line2Array.push(sigSortsArray[j].SigSorts.length);
  }
  factorCharacteristicsSheetArray.push(line2Array);

  // line 3 - Avg. Rel. Coef.
  // todo - !important - change this for unrestrained unforced sort patterns?
  const line3Array = [chartText4];
  for (let k = 0; k < sigSortsArray.length; k++) {
    line3Array.push(0.8);
  }
  factorCharacteristicsSheetArray.push(line3Array);

  // line 4 - Composite Reliability
  const line4Array = [chartText5];
  let nSorts, compositeRel;
  const composRelArray = [];
  for (let m = 0; m < sigSortsArray.length; m++) {
    nSorts = sigSortsArray[m].SigSorts.length;
    compositeRel = evenRound((nSorts * 0.8) / (1 + (nSorts - 1) * 0.8), 3);
    composRelArray.push(compositeRel);
    line4Array.push(compositeRel);
  }
  factorCharacteristicsSheetArray.push(line4Array);

  // line 5 - S.E. of Factor Z-scores
  const line5Array = [chartText6];
  const stndErrorArray = [];
  for (let p = 0; p < sigSortsArray.length; p++) {
    const stndError = evenRound(Math.sqrt(Math.abs(1.0 - composRelArray[p])), 3);
    stndErrorArray.push(stndError);
    line5Array.push(stndError);
  }
  factorCharacteristicsSheetArray.push(line5Array);
  factorCharacteristicsSheetArray.unshift(spacer, [chartText1], spacer);

  outputData.push(factorCharacteristicsSheetArray);

  store.setState({
    factorCharacteristicsArray: factorCharacteristicsSheetArray
  });

  return [
    sheetNames,
    output,
    stndErrorArray,
    analysisOutput,
    sigFactorNumbersArray,
    outputData,
    sheetNamesXlsx,
    colSizes
  ];
};

export default pushFactorCharacteristicsToOutput;
