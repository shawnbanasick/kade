import store from "../../store";
import includes from 'lodash/includes';
import cloneDeep from "lodash/cloneDeep";
import weightRawSorts from "./3_weightRawSorts";
import calculateZScores from "./3_calculateZScores";
import weightFactorScores from "./3_weightFactorScores";
import assignFactorScores from "./3_assignFactorScores";
import combineWeightedSorts from "./3_combineWeightedSorts";
import computeFactorWeights from "./3_computeFactorWeights";
import findLargestFactorWeights from "./3_findLargestFactorWeights";

const pushFactorsToOutputArray = function(
  sheetNames,
  output,
  outputData,
  sheetNamesXlsx,
  colSizes
) {
  // pulls array - ["factor 1", "factor 2", "factor 3", "factor 4", "factor 5", "factor 6", "factor 7", "factor 8"]
  let userSelectedFactors = store.getState("userSelectedFactors");
  //let numFactorsKeptForRot = store.getState("numFactorsKeptForRot");
  let numFactorsSelectedForOutput = userSelectedFactors.length;
  let results = store.getState("currentLoadingsTable");

  // strip spaces from userSelectedFactors
  // create check array of userSelectedFactors
  let newUserSelectedFactorsArray = [];
  let userSelectedFactorsCheckArray = [];
  for (let k = 0; k < userSelectedFactors.length; k++) {
    // userSelectedFactors[k] = userSelectedFactors[k].replace(/\s/g, "");
    let temp1 = userSelectedFactors[k].split(" ");
    let check = "check" + temp1[1];
    let factorName = "factor" + temp1[1];
    userSelectedFactorsCheckArray.push(check);
    newUserSelectedFactorsArray.push(factorName);
  }
  userSelectedFactors = [...newUserSelectedFactorsArray];

  // resort the array of objects
  userSelectedFactors.sort(function(a, b) {
    return a - b;
  });

  let significantLoadingsArray = [];
  let loadingSortCheckArray = [];

  // loop through results array to find user-selected factor loadings
  for (let i = 0, iLen = results.length; i < iLen; i++) {
    let respondentName;
    // let factorNumberCount = 0;
    let tempArray = [];
    let thisRow = results[i];

    for (let j = 0, jLen = numFactorsSelectedForOutput; j < jLen; j++) {
      // let key1 = "factor" + (j + 1);
      let key1 = userSelectedFactors[j];
      // let key2 = "check" + (j + 1);
      let key2 = userSelectedFactorsCheckArray[j];
      let factorLoading = thisRow[key1];
      let isLoadingSignificant = thisRow[key2];
      respondentName = thisRow.respondent;
      // let factor = userSelectedFactors[i];

      if (
        isLoadingSignificant === true &&
        userSelectedFactors.indexOf(key1) > -1
      ) {
        tempArray.push(key1, respondentName, factorLoading);
        loadingSortCheckArray.push(key1);
      }
    }
    if (tempArray.length === 0) {
      tempArray.push(99, respondentName, "Unique Sort");
      significantLoadingsArray.push(tempArray);
    } else {
      significantLoadingsArray.push(tempArray);
    }
  }

  // check for sorts flagged for more than one factor - error display
  let multipleFactorsFlaggedArray = [];
  for (let p = 0; p < significantLoadingsArray.length; p++) {
    let test = significantLoadingsArray[p];
    if (test.length > 3) {
      multipleFactorsFlaggedArray.push(significantLoadingsArray[p][1]);
    }
  }
  if (multipleFactorsFlaggedArray.length > 0) {
    let flaggedArrayText = multipleFactorsFlaggedArray.join(", ");
    store.setState({
      sortsFlaggedOnTwoFactors: flaggedArrayText,
      showMultipleFactorsFlaggedWarningModal: true,
      showOutputFactorSelection: false,
      userSelectedFactors: [],
      shouldDisplayFactorVizOptions: false,
      showFactorCorrelationsTable: false,
      showStandardErrorsDifferences: false,
      showFactorCharacteristicsTable: false,
      showDownloadOutputButtons: false,
      displayFactorVisualizations: false
    });
    return "haltOutputProcessing";
  }

  // check for user-selected factors with no flagged loading sorts - user error
  let problemFactorsArray = [];
  for (let r = 0; r < userSelectedFactors.length; r++) {
    let loadingSortCheck = includes(
      loadingSortCheckArray,
      userSelectedFactors[r]
    );

    if (!loadingSortCheck) {
      problemFactorsArray.push(userSelectedFactors[r]);
    }
  }

  // show warning modal and stop calcs if factor with no flag selected
  if (problemFactorsArray.length > 0) {
    console.log("ERROR - no loadings flagged for " + problemFactorsArray);
    problemFactorsArray = problemFactorsArray.join(", ");
    store.setState({
      factorsWithoutLoading: problemFactorsArray,
      showNoLoadingsFlaggedWarningModal: true
    });
    return "haltOutputProcessing";
  }

  let factorWeights = computeFactorWeights(significantLoadingsArray);
  let largestFactorWeights = findLargestFactorWeights(factorWeights);
  let weightedFactorScores = weightFactorScores(...largestFactorWeights);
  let weightedRawSorts = weightRawSorts(weightedFactorScores);
  let combinedWeightedSorts = combineWeightedSorts(weightedRawSorts);
  let calculatedZScores = calculateZScores(combinedWeightedSorts);
  assignFactorScores(calculatedZScores);

  // CONTINUE HERE!

  let analysisOutput2 = store.getState("analysisOutput");
  let analysisOutput = cloneDeep(analysisOutput2);
  let sigSortsArray = store.getState("sigSortsArray");
  let sortsAsNumbers = store.getState("sortsAsNumbers");
  let qavRespondentNames = store.getState("respondentNames");
  let correlationTableArray = store.getState(
    // still undefined
    "correlationTableArray"
  );
  let tableHeader = cloneDeep(qavRespondentNames);
  tableHeader.unshift("");
  correlationTableArray.unshift(tableHeader);
  for (let z = 1; z < correlationTableArray.length; z++) {
    correlationTableArray[z].unshift(tableHeader[z]);
  }
  let correlationTableArrayFormatted2 = correlationTableArray;

  // let userSelectedFactors = store.getState("userSelectedFactors");
  let sortWeights = store.getState("sortWeights");

  // to hold data in STATE until later insertion into output results - to match PQMethod order
  let factorWeightFactorArrayHolder = [];
  let miniCorrelationArrayHolder = [];
  let synFactorArray1Holder = [];
  let synFactorArray1 = [];
  let sheetNamesHolder1 = [];
  let sheetNamesHolder2 = [];
  let sheetNamesHolder3 = [];

  for (let i = 0; i < analysisOutput.length; i++) {
    let temp1 = {};
    let temp1a = {};
    let temp1b = {};

    let factorNumber = sigSortsArray[i]["Factor Number"];
    let factorNumber2 = factorNumber.charAt(0).toUpperCase() + factorNumber.slice(1);
    let number = factorNumber2.substring(factorNumber2.length - 1);
    let factorNumber3 = factorNumber2.slice(0, -1);
    factorNumber = factorNumber3 + " " + number;

    temp1a.sheetid = factorNumber + " Sorts Weight";
    temp1a.header = true;
    sheetNamesHolder1.push(temp1a);

    temp1b.sheetid = factorNumber + " Sorts Corr";
    temp1b.header = true;
    sheetNamesHolder2.push(temp1b);

    temp1.sheetid = factorNumber;
    temp1.header = true;
    sheetNamesHolder3.push(temp1);
  }

  store.setState({
    sheetNamesHolder1: sheetNamesHolder1
  });
  store.setState({
    sheetNamesHolder2: sheetNamesHolder2
  });
  store.setState({
    sheetNamesHolder3: sheetNamesHolder3
  });

  // pull raw sorts for factor tables
  let rawSorts = [];
  for (let p = 0; p < sigSortsArray.length; p++) {
    let tempArray = [];
    for (let r = 0; r < sigSortsArray[p].SigSorts.length; r++) {
      let sigSort = sigSortsArray[p].SigSorts[r];
      let rawSortIndex = qavRespondentNames.indexOf(sigSort);
      let rawSortValues = sortsAsNumbers[rawSortIndex];
      tempArray.push(rawSortValues);
    }
    rawSorts.push(tempArray);
  }

  // for each factor check get a sigSort (if another remains)
  // get the raw sort for that specific sigSort
  // write that sigSorts raw sort data into testObj
  let compositeFactorMasterArray = [];
  let matchCount = [];
  //  FOR EACH FACTOR LOOP
  for (let j = 0; j < analysisOutput.length; j++) {
    // FACTOR WEIGHTS TABLES STARTS FROM HERE
    let factorWeightFactorArray = [["Q-Sort", "Weight"]];
    let factorWeightName = userSelectedFactors[j];
    for (let w = 0; w < sortWeights.length; w++) {
      let factorWeightTempArray = [];
      if (sortWeights[w][0] === factorWeightName) {
        factorWeightTempArray.push(sortWeights[w][1], sortWeights[w][3]);
        factorWeightFactorArray.push(factorWeightTempArray);
      }
    }
    // output.push(factorWeightFactorArray);
    factorWeightFactorArrayHolder.push(factorWeightFactorArray);

    // FACTOR SCORE MINI CORRELATION TABLES STARTS FROM HERE

    // loop through sigSortsArray to get this factor's sig Sorts
    let miniSortsID = userSelectedFactors[j];
    let miniCorrelationFactorsArray = [];
    for (let t = 0; t < sigSortsArray.length; t++) {
      if (sigSortsArray[t]["Factor Number"] === miniSortsID) {
        miniCorrelationFactorsArray.push(sigSortsArray[t].SigSorts);
      }
    }

    // pull correlations from table
    let miniCorrelationArray = [];
    let miniCorrelationHeaderArray = ["Q-Sort"];
    let miniCorrelationHeaderIndex = correlationTableArrayFormatted2[0];

    // loop through all sig Sorts
    for (let t3 = 0; t3 < miniCorrelationFactorsArray[0].length; t3++) {
      miniCorrelationHeaderArray.push(miniCorrelationFactorsArray[0][t3]);

      // loop through correlation table array
      for (let t1 = 0; t1 < correlationTableArrayFormatted2.length; t1++) {
        let tempArrayT1 = [];

        // find row for  the sig sorts, then push data
        if (
          correlationTableArrayFormatted2[t1][0] ===
          miniCorrelationFactorsArray[0][t3]
        ) {
          // push name into left column
          tempArrayT1.push(miniCorrelationFactorsArray[0][t3]);

          // cycle through row to find push data for all sigSorts
          for (let t2 = 0; t2 < miniCorrelationFactorsArray[0].length; t2++) {
            let index = miniCorrelationHeaderIndex.indexOf(
              miniCorrelationFactorsArray[0][t2]
            );
            tempArrayT1.push(correlationTableArrayFormatted2[t1][index]);
          }
          miniCorrelationArray.push(tempArrayT1);
        }
      }
    }
    miniCorrelationArray.unshift(miniCorrelationHeaderArray);

    // output.push(miniCorrelationArray);
    miniCorrelationArrayHolder.push(miniCorrelationArray);

    // SYNTHETIC FACTOR OUTPUT STARTS FROM HERE
    // convert arrays to object
    let synFactorArray = [];
    let matchCountArray = [];
    let compositeFactorArray = [];

    // simul calc two md arrays - one for tables, one for match counts
    for (let m = 0, mLen = analysisOutput[0].length; m < mLen; m++) {
      // initialize and empty temp objs and arrays
      let tempObj = {};
      let tempObj5 = {};
      //let matchSortValue = [];
      let matchingCounter = 0;
      let compositeFactorTempArray = [];

      tempObj5.indexer = analysisOutput[j][m].statement;
      tempObj5.matchSortValue = analysisOutput[j][m].sortValue;
      tempObj5.zScore = analysisOutput[j][m].zScore;
      let testValue = analysisOutput[j][m].sortValue;

      tempObj["Statement Number"] = analysisOutput[j][m].statement;
      tempObj["Statement"] = analysisOutput[j][m].sortStatement;
      tempObj["Z-score"] = analysisOutput[j][m].zScore;
      tempObj["Sort Values"] = analysisOutput[j][m].sortValue;

      // set up new output array
      compositeFactorTempArray.push(
        analysisOutput[j][m].statement,
        analysisOutput[j][m].sortStatement,
        analysisOutput[j][m].zScore,
        analysisOutput[j][m].sortValue
      );

      for (var s = 0, sLen = rawSorts[j].length; s < sLen; s++) {
        tempObj["Raw Sort " + sigSortsArray[j].SigSorts[s]] = rawSorts[j][s][m];
        // add to new output array
        compositeFactorTempArray.push(rawSorts[j][s][m]);
        // matchSortValue.push(rawSorts[j][s][m]);
        if (testValue === rawSorts[j][s][m]) {
          matchingCounter++;
        }
      } // pushing in raw sort vals
      tempObj5.matchingCounts = matchingCounter;
      tempObj5.matchingCountsPercent = parseInt(
        matchingCounter / sLen * 100,
        10
      );
      // tempObj5.matchSortValue = matchSortValue;
      matchCountArray.push(tempObj5);
      synFactorArray.push(tempObj);
      // add to new output array
      compositeFactorArray.push(compositeFactorTempArray);
    } // pushing in q-sort loadings
    // add to new output Master array
    compositeFactorMasterArray.push(compositeFactorArray);
    matchCount.push(matchCountArray); // push in factor arrays
    synFactorArray1 = cloneDeep(synFactorArray);

    synFactorArray1.sort(function(a, b) {
      if (b["Z-score"] === a["Z-score"]) {
        return b["Statement Number"] - a["Statement Number"];
      } else {
        return b["Z-score"] - a["Z-score"];
      }
    });

    // output.push(synFactorArray1);
    synFactorArray1Holder.push(synFactorArray1);
  }

  store.setState({
    factorWeightFactorArrayHolder: factorWeightFactorArrayHolder
  });
  store.setState({
    miniCorrelationArrayHolder: miniCorrelationArrayHolder
  });
  store.setState({
    synFactorArray1Holder: synFactorArray1Holder
  });
  store.setState({
    matchCount: matchCount
  });
  store.setState({
    compositeFactorMasterArray: compositeFactorMasterArray
  });

  return [sheetNames, output, outputData, sheetNamesXlsx, colSizes];
};

export default pushFactorsToOutputArray;
