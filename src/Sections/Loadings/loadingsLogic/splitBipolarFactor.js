import cloneDeep from "lodash/cloneDeep";
import state from "../../../store";

const splitBipolarFactor = () => {
  const val = state.getState("factorToSplit");

  // if no factor selected do nothing
  if (val !== undefined) {
    // Archive current table

    // get bipolar split counter and archive counter, then increment
    let bipolarSplitCounter = state.getState("bipolarSplitCount");
    let archiveCounter = state.getState("archiveCounter");
    archiveCounter += 1;
    const archiveName = `facMatrixArc${archiveCounter}`;
    const projectHistoryArray = state.getState("projectHistoryArray");
    const projectHistoryArrayLength = projectHistoryArray.length;
    const bipolarIndexArray = state.getState("bipolarIndexArray");

    // check to see if first bipolar split
    if (bipolarSplitCounter === 0) {
      // if yes, archive the usual way
      const factorMatrix = state.getState("factorMatrix");

      // increment the bipolar split counter
      bipolarSplitCounter += 1;

      // send counters back to state
      state.setState({
        archiveCounter,
        bipolarSplitCount: bipolarSplitCounter
      });

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
      // if not first bipolar split, archive the current loadings table AND column defs
      const currentLoadingsTable = state.getState("currentLoadingsTable");
      const columnDefs = state.getState("gridColDefsLoadingsTable");

      // increment the bipolar split counter
      bipolarSplitCounter += 1;

      // store the new counter values
      state.setState({
        archiveCounter,
        bipolarSplitCount: bipolarSplitCounter
      });

      // send archive to local storage to use with the undo function in Project History
      sessionStorage.setItem(
        archiveName,
        JSON.stringify([columnDefs, currentLoadingsTable])
      );
    }
    // *** end IF ELSE ***

    // begin factor split process
    const dataRows = state.getState("currentLoadingsTable");
    const columnDefs = state.getState("gridColDefsLoadingsTable");
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
    const newObjectA = cloneDeep(columnDefs[spliceIndex]);
    const newObjectB = cloneDeep(columnDefs[spliceIndex]);
    const newObjectA_check = cloneDeep(columnDefs[spliceIndex_check]);
    const newObjectB_check = cloneDeep(columnDefs[spliceIndex_check]);

    // remove the objects from the array
    columnDefs.splice(spliceIndex, 2); // columnDefs[val+4];

    // change header names
    newObjectA.headerName = `Factor ${val}a`;
    newObjectA_check.headerName = `F${val}a`;
    newObjectB.headerName = `Factor ${val}b`;
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
    const projectHistoryText = `Bipolar Factor ${val} was split into Factor ${val}a and Factor ${val}b`;
    projectHistoryArray.push(projectHistoryText);

    state.setState({
      gridColDefsLoadingsTable: columnDefs,
      gridRowDataLoadingsTable: dataRows,
      projectHistoryArray,
      factorToSplit: undefined,
      // hide section 6
      showOutputFactorSelection: false,
      userSelectedFactors: [],
      shouldDisplayFactorVizOptions: false,
      showFactorCorrelationsTable: false,
      showStandardErrorsDifferences: false,
      showFactorCharacteristicsTable: false,
      showDownloadOutputButtons: false,
      displayFactorVisualizations: false,
      bipolarDisabled: true,
      bipolarIndexArray,
      sendDataToOutputButtonColor: "orange"
    });
  }
};

export default splitBipolarFactor;
