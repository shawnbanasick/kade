import loadingState from "../../GlobalState/loadingState";
import outputState from "../../GlobalState/outputState";
import projectHistoryState from "../../GlobalState/projectHistoryState";
import factorState from "../../GlobalState/factorState";
import rotationState from "../../GlobalState/rotationState";
import i18n from "i18next";
const clone = require("rfdc")();

const splitBipolarFactor = () => {
  // getState
  const val = loadingState.factorToSplit;

  // if no factor selected do nothing
  if (val !== undefined) {
    // Archive current table

    // getState - get bipolar split counter and archive counter, then increment
    let bipolarSplitCounter = loadingState.bipolarSplitCount;
    let archiveCounter = rotationState.archiveCounter;
    archiveCounter += 1;
    const archiveName = `facMatrixArc${archiveCounter}`;
    const projectHistoryArray = clone(projectHistoryState.projectHistoryArray);
    const projectHistoryArrayLength = projectHistoryArray.length;
    const bipolarIndexArray = clone(loadingState.bipolarIndexArray);

    // check to see if first bipolar split
    if (bipolarSplitCounter === 0) {
      // getState - if yes, archive the usual way
      const factorMatrix = clone(factorState.factorMatrix);

      // increment the bipolar split counter
      bipolarSplitCounter += 1;

      // send counters back to state
      rotationState.archiveCounter = archiveCounter;
      loadingState.bipolarSplitCount = bipolarSplitCounter;

      // send archive to local storage to use with the undo function in Project History
      sessionStorage.setItem(archiveName, JSON.stringify(factorMatrix));
      sessionStorage.setItem(
        "undoAllBipolarMatrix",
        JSON.stringify(factorMatrix)
      );
      sessionStorage.setItem(
        "projectHistoryArrayLength",
        JSON.stringify(projectHistoryArrayLength)
      );
    } else {
      // getState - if not first bipolar split, archive the current loadings table AND column defs
      const currentLoadingsTable = clone(loadingState.currentLoadingsTable);
      const columnDefs = clone(loadingState.gridColDefsLoadingsTable);

      // increment the bipolar split counter
      bipolarSplitCounter += 1;

      // store the new counter values
      rotationState.archiveCounter = archiveCounter;
      loadingState.bipolarSplitCount = bipolarSplitCounter;

      // send archive to local storage to use with the undo function in Project History
      sessionStorage.setItem(
        archiveName,
        JSON.stringify([columnDefs, currentLoadingsTable])
      );
    }
    // *** end IF ELSE ***

    // begin factor split process
    const dataRows = clone(loadingState.currentLoadingsTable);
    const columnDefs = clone(loadingState.gridColDefsLoadingsTable);
    const factorValue = `factor${val}`;
    const checkValue = `check${val}`;

    bipolarIndexArray.push(val);

    // change name to add a and b => 1 becomes 1a and 1b
    const factorValue_A = `${factorValue}a`;
    const factorValue_B = `${factorValue}b`;
    const check_A = `${checkValue}a`;
    const check_B = `${checkValue}b`;

    // get the index value
    const fieldsArray = [];
    for (let k = 0, kLen = columnDefs.length; k < kLen; k += 1) {
      fieldsArray.push(columnDefs[k].field);
    }
    const spliceIndex = fieldsArray.indexOf(factorValue);
    const spliceIndex_check = spliceIndex + 1;

    // copy and convert old object to 2 replacement objects
    const newObjectA = clone(columnDefs[spliceIndex]);
    const newObjectB = clone(columnDefs[spliceIndex]);
    const newObjectA_check = clone(columnDefs[spliceIndex_check]);
    const newObjectB_check = clone(columnDefs[spliceIndex_check]);

    // remove the objects from the array
    columnDefs.splice(spliceIndex, 2); // columnDefs[val+4];

    // change header names
    newObjectA.headerName = `${i18n.t("Factor")} ${val}a`;
    newObjectA_check.headerName = `F${val}a`;
    newObjectB.headerName = `${i18n.t("Factor")} ${val}b`;
    newObjectB_check.headerName = `F${val}b`;

    // change field
    newObjectA.field = factorValue_A;
    newObjectA_check.field = check_A;
    newObjectB.field = factorValue_B;
    newObjectB_check.field = check_B;

    // re-insert into array
    columnDefs.splice(
      spliceIndex,
      0,
      newObjectA,
      newObjectA_check,
      newObjectB,
      newObjectB_check
    );

    // cycle through the array of row objects to insert new column values and flags
    for (let i = 0, iLen = dataRows.length; i < iLen; i += 1) {
      const curr_val = dataRows[i][factorValue]; // incoming value
      const curr_check = dataRows[i][checkValue]; // incoming check

      // keep all same values for factor A
      dataRows[i][factorValue_A] = curr_val;

      // invert all signs in copy factor B
      dataRows[i][factorValue_B] = -curr_val;

      // if negative value and checked in curr => uncheck in A and check in B (now positive value)
      if (curr_val < 0 && curr_check === true) {
        dataRows[i][check_A] = false;
        dataRows[i][check_B] = true;
      } else {
        // if positive value and checked in curr => stay checked in A and no check but no check for B
        dataRows[i][check_A] = curr_check;
        dataRows[i][check_B] = false;
      }

      // delete old values from object
      delete dataRows[i][factorValue];
      delete dataRows[i][checkValue];
    }

    // update the UI with split factor actions added to project history
    const projectHistoryText = `${i18n.t("Bipolar Factor")} ${val} ${i18n.t(
      "was split into"
    )} ${i18n.t("Factor")} ${val}a ${i18n.t("and")} ${i18n.t(
      "Factor"
    )} ${val}b`;

    const logMessageObj = {
      logMessage: projectHistoryText,
      logType: "Bipolar"
    };

    projectHistoryArray.push(logMessageObj);

    projectHistoryState.projectHistoryArray = projectHistoryArray;
    loadingState.gridColDefsLoadingsTable = columnDefs;
    loadingState.gridRowDataLoadingsTable = dataRows;
    loadingState.factorToSplit = undefined;
    // hide section 6
    outputState.showOutputFactorSelection = false;
    outputState.userSelectedFactors = [];
    outputState.shouldDisplayFactorVizOptions = false;
    outputState.showFactorCorrelationsTable = false;
    outputState.showStandardErrorsDifferences = false;
    outputState.showFactorCharacteristicsTable = false;
    outputState.showDownloadOutputButtons = false;
    outputState.displayFactorVisualizations = false;
    loadingState.bipolarDisabled = true;
    loadingState.bipolarIndexArray = bipolarIndexArray;
    loadingState.sendDataToOutputButtonColor = "orange";
  }
};

export default splitBipolarFactor;
