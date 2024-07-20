import includes from 'lodash/includes';
import weightRawSorts from './3_weightRawSorts';
import calculateZScores from './3_calculateZScores';
import weightFactorScores from './3_weightFactorScores';
import assignFactorScores from './3_assignFactorScores';
import combineWeightedSorts from './3_combineWeightedSorts';
import computeFactorWeights from './3_computeFactorWeights';
import findLargestFactorWeights from './3_findLargestFactorWeights';
import outputState from '../../GlobalState/outputState';
import calcState from '../../GlobalState/calcState';
import loadingState from '../../GlobalState/loadingState';
import coreState from '../../GlobalState/coreState';
import correlationState from '../../GlobalState/correlationState';
import i18n from 'i18next';
import cloneDeep from 'lodash/cloneDeep';
import { result } from 'lodash';

const pushFactorsToOutputArray = (outputData, sheetNamesXlsx, colSizes) => {
  // pulls array - ["factor 1", "factor 2", "factor 3", "factor 4", "factor 5", "factor 6", "factor 7", "factor 8"]
  let userSelectedFactors = outputState.getState().userSelectedFactors;
  console.log(JSON.stringify(userSelectedFactors));
  const numFactorsSelectedForOutput = userSelectedFactors.length;
  const results = loadingState.getState().currentLoadingsTable;
  console.log(JSON.stringify(result));

  // strip spaces from userSelectedFactors
  // create check array of userSelectedFactors
  const newUserSelectedFactorsArray = [];
  const userSelectedFactorsCheckArray = [];
  for (let k = 0; k < userSelectedFactors.length; k += 1) {
    const temp1 = userSelectedFactors[k].split(' ');
    const check = `check${temp1[1]}`;
    const factorName = `factor${temp1[1]}`;
    userSelectedFactorsCheckArray.push(check);
    newUserSelectedFactorsArray.push(factorName);
  }
  userSelectedFactors = [...newUserSelectedFactorsArray];

  // resort the array of objects
  userSelectedFactors.sort((a, b) => a - b);

  const significantLoadingsArray = [];
  const loadingSortCheckArray = [];
  const multipleFactorsFlaggedArray = [];

  // loop through results array to find user-selected factor loadings
  for (let i = 0, iLen = results.length; i < iLen; i += 1) {
    let respondentName;
    // const factorNumberCount = 0;
    const thisRow = results[i];
    let tempArray = [];

    for (let j = 0, jLen = numFactorsSelectedForOutput; j < jLen; j += 1) {
      // const key1 = "factor" + (j + 1);
      const key1 = userSelectedFactors[j];
      // const key2 = "check" + (j + 1);
      const key2 = userSelectedFactorsCheckArray[j];
      const factorLoading = thisRow[key1];
      const isLoadingSignificant = thisRow[key2];
      respondentName = thisRow.respondent;
      // const factor = userSelectedFactors[i];

      if (isLoadingSignificant === true && userSelectedFactors.indexOf(key1) > -1) {
        if (tempArray.length !== 0) {
          // for the case of participant flagged for more than one factor
          tempArray = [];
          tempArray.push(key1, respondentName, factorLoading);
          loadingSortCheckArray.push(key1);
          significantLoadingsArray.push(tempArray);
          multipleFactorsFlaggedArray.push(respondentName);
        } else {
          // normal case
          tempArray.push(key1, respondentName, factorLoading);
          loadingSortCheckArray.push(key1);
          significantLoadingsArray.push(tempArray);
        }
      }
    }

    if (tempArray.length === 0) {
      tempArray.push(99, respondentName, i18n.t('Unique Sort'));
      significantLoadingsArray.push(tempArray);
    }
  }

  // check for sorts flagged for more than one factor - error display
  if (multipleFactorsFlaggedArray.length > 0) {
    const flaggedArrayText = multipleFactorsFlaggedArray.join(', ');
    outputState.setState({ sortsFlaggedOnTwoFactors: flaggedArrayText });
    outputState.setState({ showMultipleFactorsFlaggedWarningModal: true });
  }

  // check for Q sorts flagged on 2 or more factors

  // check for user-selected factors with no flagged loading sorts - user error
  let problemFactorsArray = [];
  for (let r = 0; r < userSelectedFactors.length; r += 1) {
    const loadingSortCheck = includes(loadingSortCheckArray, userSelectedFactors[r]);

    if (!loadingSortCheck) {
      problemFactorsArray.push(userSelectedFactors[r]);
    }
  }

  // show warning modal and stop calcs if factor with no flag selected
  if (problemFactorsArray.length > 0) {
    problemFactorsArray = problemFactorsArray.join(', ');
    outputState.setState({ factorsWithoutLoading: problemFactorsArray });
    outputState.setState({ showNoLoadingsFlaggedWarningModal: true });
    return 'haltOutputProcessing';
  }

  const factorWeights = computeFactorWeights(significantLoadingsArray);
  const largestFactorWeights = findLargestFactorWeights(factorWeights);
  const weightedFactorScores = weightFactorScores(...largestFactorWeights);
  const weightedRawSorts = weightRawSorts(weightedFactorScores);
  const combinedWeightedSorts = combineWeightedSorts(weightedRawSorts);
  const calculatedZScores = calculateZScores(combinedWeightedSorts);

  assignFactorScores(calculatedZScores);

  // CONTINUE HERE!

  const analysisOutput2 = calcState.getState().analysisOutput;
  const analysisOutput = cloneDeep(analysisOutput2);
  const sigSortsArray = calcState.getState().sigSortsArray;
  const sortsAsNumbers = calcState.getState().sortsAsNumbers;
  const qavRespondentNames = coreState.getState().respondentNames;
  const correlationTableArray = correlationState.getState().correlationTableArray;
  const tableHeader = cloneDeep(qavRespondentNames);
  tableHeader.unshift('');
  correlationTableArray.unshift(tableHeader);
  for (let z = 1; z < correlationTableArray.length; z += 1) {
    correlationTableArray[z].unshift(tableHeader[z]);
  }
  const correlationTableArrayFormatted2 = correlationTableArray;

  // const userSelectedFactors = state.getState("userSelectedFactors");
  const sortWeights = calcState.getState().sortWeights;

  // to hold data in STATE until later insertion into output results - to match PQMethod order
  const factorWeightFactorArrayHolder = [];
  const miniCorrelationArrayHolder = [];
  const synFactorArray1Holder = [];
  let synFactorArray1 = [];
  const sheetNamesHolder1 = [];
  const sheetNamesHolder2 = [];
  const sheetNamesHolder3 = [];

  for (let i = 0; i < analysisOutput.length; i += 1) {
    const temp1 = {};
    const temp1a = {};
    const temp1b = {};

    const factorNumber4 = sigSortsArray[i]['Factor Number'];
    const factorNumber2 = factorNumber4.charAt(0).toUpperCase() + factorNumber4.slice(1);
    let number = factorNumber2.substring(factorNumber2.length - 1);

    // for bipolar split - catch "1a" as factor number
    if (isNaN(+number)) {
      number = `${factorNumber2.substring(factorNumber2.length - 2)}`;
    }

    // const factorNumber3 = factorNumber2.slice(0, -1);
    const factorNumber = `${i18n.t('Fac')} ${number}`;

    // get trans. - MS Excel has 30 char. limit, (prepend FAC. #)
    let sheetName1 = i18n.t('Sorts Weight');
    if (sheetName1.length > 23) {
      sheetName1 = i18n.t('Sorts Weight short');
    }

    temp1a.sheetid = `${factorNumber} ${sheetName1}`;
    temp1a.header = true;
    sheetNamesHolder1.push(temp1a);

    // get trans. - MS Excel has 30 char. limit, (prepend FAC. #)
    let sheetName2 = i18n.t('Sorts Corr');
    if (sheetName2.length > 23) {
      sheetName2 = i18n.t('Sorts Corr short');
    }
    temp1b.sheetid = `${factorNumber} ${sheetName2}`;
    temp1b.header = true;
    sheetNamesHolder2.push(temp1b);

    temp1.sheetid = factorNumber;
    temp1.header = true;
    sheetNamesHolder3.push(temp1);
  }
  calcState.setState({ sheetNamesHolder1: sheetNamesHolder1 });
  calcState.setState({ sheetNamesHolder2: sheetNamesHolder2 });
  calcState.setState({ sheetNamesHolder3: sheetNamesHolder3 });

  // pull raw sorts for factor tables
  const rawSorts = [];
  for (let p = 0; p < sigSortsArray.length; p += 1) {
    const tempArray = [];
    for (let r = 0; r < sigSortsArray[p].SigSorts.length; r += 1) {
      const sigSort = sigSortsArray[p].SigSorts[r];
      const rawSortIndex = qavRespondentNames.indexOf(sigSort);
      const rawSortValues = sortsAsNumbers[rawSortIndex];
      tempArray.push(rawSortValues);
    }
    rawSorts.push(tempArray);
  }

  console.log(JSON.stringify('rawSorts', rawSorts));

  // for each factor check get a sigSort (if another remains)
  // get the raw sort for that specific sigSort
  // write that sigSorts raw sort data into testObj
  const compositeFactorMasterArray = [];
  const matchCount = [];
  //  FOR EACH FACTOR LOOP
  for (let j = 0; j < analysisOutput.length; j += 1) {
    // FACTOR WEIGHTS TABLES STARTS FROM HERE
    const factorWeightFactorArray = [[i18n.t('Nm'), i18n.t('Q-Sort'), i18n.t('Weight')]];
    const factorWeightName = userSelectedFactors[j];
    for (let w = 0; w < sortWeights.length; w += 1) {
      const factorWeightTempArray = [];
      if (sortWeights[w][0] === factorWeightName) {
        let qsNumber = qavRespondentNames.indexOf(sortWeights[w][1]) + 1;
        factorWeightTempArray.push(qsNumber, sortWeights[w][1], sortWeights[w][3]);
        factorWeightFactorArray.push(factorWeightTempArray);
      }
    }
    // output.push(factorWeightFactorArray);
    factorWeightFactorArrayHolder.push(factorWeightFactorArray);

    // FACTOR SCORE MINI CORRELATION TABLES STARTS FROM HERE

    // loop through sigSortsArray to get this factor's sig Sorts
    const miniSortsID = userSelectedFactors[j];
    const miniCorrelationFactorsArray = [];
    for (let t = 0; t < sigSortsArray.length; t += 1) {
      if (sigSortsArray[t]['Factor Number'] === miniSortsID) {
        miniCorrelationFactorsArray.push(sigSortsArray[t].SigSorts);
      }
    }

    // pull correlations from table
    const miniCorrelationArray = [];
    const miniCorrelationHeaderArray = [i18n.t('Q-Sort')];
    const miniCorrelationHeaderIndex = correlationTableArrayFormatted2[0];

    // loop through all sig Sorts
    for (let t3 = 0; t3 < miniCorrelationFactorsArray[0].length; t3 += 1) {
      miniCorrelationHeaderArray.push(miniCorrelationFactorsArray[0][t3]);

      // loop through correlation table array
      for (let t1 = 0; t1 < correlationTableArrayFormatted2.length; t1 += 1) {
        const tempArrayT1 = [];

        // find row for  the sig sorts, then push data
        if (correlationTableArrayFormatted2[t1][0] === miniCorrelationFactorsArray[0][t3]) {
          // push name into left column
          tempArrayT1.push(miniCorrelationFactorsArray[0][t3]);

          // cycle through row to find push data for all sigSorts
          for (let t2 = 0; t2 < miniCorrelationFactorsArray[0].length; t2 += 1) {
            const index = miniCorrelationHeaderIndex.indexOf(miniCorrelationFactorsArray[0][t2]);
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
    const synFactorArray = [];
    const matchCountArray = [];
    const compositeFactorArray = [];

    // simul calc two md arrays - one for tables, one for match counts
    for (let m = 0, mLen = analysisOutput[0].length; m < mLen; m += 1) {
      // initialize and empty temp objs and arrays
      const tempObj = {};
      const tempObj5 = {};
      let matchingCounter = 0;
      const compositeFactorTempArray = [];

      tempObj5.indexer = analysisOutput[j][m].statement;
      tempObj5.matchSortValue = analysisOutput[j][m].sortValue;
      tempObj5.zScore = analysisOutput[j][m].zScore;
      const testValue = analysisOutput[j][m].sortValue;

      tempObj['Statement Number'] = analysisOutput[j][m].statement;
      tempObj.Statement = analysisOutput[j][m].sortStatement;
      tempObj['Z-score'] = analysisOutput[j][m].zScore;
      tempObj['Sort Values'] = analysisOutput[j][m].sortValue;

      // set up new output array
      compositeFactorTempArray.push(
        analysisOutput[j][m].statement,
        analysisOutput[j][m].sortStatement,
        analysisOutput[j][m].zScore,
        analysisOutput[j][m].sortValue
      );

      console.log(JSON.stringify(rawSorts[j]));
      console.log(JSON.stringify(sigSortsArray[j]));

      const sLen = rawSorts[j].length;
      for (let s = 0; s < sLen; s += 1) {
        tempObj[`${i18n.t('Raw Sort')} ${sigSortsArray[j].SigSorts[s]}`] = rawSorts[j][s][m];
        // add to new output array
        compositeFactorTempArray.push(rawSorts[j][s][m]);
        if (testValue === rawSorts[j][s][m]) {
          matchingCounter += 1;
        }
      } // pushing in raw sort vals
      tempObj5.matchingCounts = matchingCounter;
      tempObj5.matchingCountsPercent = parseInt((matchingCounter / sLen) * 100, 10);
      matchCountArray.push(tempObj5);
      synFactorArray.push(tempObj);
      // add to new output array
      compositeFactorArray.push(compositeFactorTempArray);
    } // pushing in q-sort loadings
    // add to new output Master array
    compositeFactorMasterArray.push(compositeFactorArray);
    matchCount.push(matchCountArray); // push in factor arrays
    synFactorArray1 = cloneDeep(synFactorArray);

    synFactorArray1.sort((a, b) => {
      if (b['Z-score'] === a['Z-score']) {
        return b['Statement Number'] - a['Statement Number'];
      }
      return b['Z-score'] - a['Z-score'];
    });

    // output.push(synFactorArray1);
    synFactorArray1Holder.push(synFactorArray1);
  }

  calcState.setState({ factorWeightFactorArrayHolder: factorWeightFactorArrayHolder });
  calcState.setState({ miniCorrelationArrayHolder: miniCorrelationArrayHolder });
  calcState.setState({ synFactorArray1Holder: synFactorArray1Holder });
  calcState.setState({ matchCount: matchCount });
  calcState.setState({ compositeFactorMasterArray: compositeFactorMasterArray });

  console.log('dispatch - 9 - pushFreeDistributionData complete');

  return [outputData, sheetNamesXlsx, colSizes];
};

export default pushFactorsToOutputArray;
