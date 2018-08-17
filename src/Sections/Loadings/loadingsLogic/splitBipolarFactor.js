import store from "../../store";

const splitBipolarFactor = () => {
    let val = store.getState("factorToSplit");
    
    // if no factor selected do nothing
    if (val !== undefined) {
        //Archive current table
        
        // get bipolar split counter
        let bipolarSplitCounter = store.getState("bipolarSplitCount");
        let archiveCounter = store.getState("archiveCounter");
        archiveCounter = archiveCounter + 1;
        let archiveName = "facMatrixArc" + archiveCounter;
        let projectHistoryArray = store.getState("projectHistoryArray");
        let projectHistoryArrayLength = projectHistoryArray.length;
        let bipolarIndexArray = store.getState("bipolarIndexArray");

        // check to see if first bipolar split
        if (bipolarSplitCounter === 0) {
            // if yes, archive the usual way
            let factorMatrix = store.getState("factorMatrix");

            // increment the bipolar split counter
            bipolarSplitCounter = bipolarSplitCounter + 1;

            store.setState({
                archiveCounter: archiveCounter,
                bipolarSplitCount: bipolarSplitCounter
            });

            // send archive to local storage to use with the undo function in Project History
            sessionStorage.setItem(archiveName, JSON.stringify(factorMatrix));
            sessionStorage.setItem("undoAllBipolarMatrix", JSON.stringify(factorMatrix));
            sessionStorage.setItem("projectHistoryArrayLength", JSON.stringify(projectHistoryArrayLength));        
        } else {
            // if not first bipolar split, archive the current loadings table AND column defs
            let currentLoadingsTable = store.getState("currentLoadingsTable");
            let columnDefs = store.getState("gridColDefsLoadingsTable");

            // increment the bipolar split counter
            bipolarSplitCounter = bipolarSplitCounter + 1;

            // store the new counter values
            store.setState({
                archiveCounter: archiveCounter,
                bipolarSplitCount: bipolarSplitCounter
            });

            // send archive to local storage to use with the undo function in Project History
            sessionStorage.setItem(
                archiveName,
                JSON.stringify([columnDefs, currentLoadingsTable])
            );
        }

        // begin factor split process
        let dataRows = store.getState("currentLoadingsTable");
        let columnDefs = store.getState("gridColDefsLoadingsTable");
        let factorValue = "factor" + val;
        let checkValue = "check" + val;

        bipolarIndexArray.push(val);

        // change name to add a and b => 1 becomes 1a and 1b
        let factorValue_A = factorValue + "a";
        let factorValue_B = factorValue + "b";
        let check_A = checkValue + "a";
        let check_B = checkValue + "b";

        // get the index value
        let fieldsArray = [];
        for (let k = 0, kLen = columnDefs.length; k < kLen; k++) {
            fieldsArray.push(columnDefs[k]["field"]);
        }
        let spliceIndex = fieldsArray.indexOf(factorValue);
        let spliceIndex_check = spliceIndex + 1;

        // copy and convert old object to 2 replacement objects
        let newObjectA = {
            ...columnDefs[spliceIndex]
        };
        let newObjectB = {
            ...columnDefs[spliceIndex]
        };
        let newObjectA_check = {
            ...columnDefs[spliceIndex_check]
        };
        let newObjectB_check = {
            ...columnDefs[spliceIndex_check]
        };

        // remove the objects from the array
        columnDefs.splice(spliceIndex, 2); // columnDefs[val+4];

        // change header names
        newObjectA.headerName = "Factor " + val + "a";
        newObjectA_check.headerName = "F" + val + "a";
        newObjectB.headerName = "Factor " + val + "b";
        newObjectB_check.headerName = "F" + val + "b";

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
        for (let i = 0, iLen = dataRows.length; i < iLen; i++) {
            let curr_val = dataRows[i][factorValue]; // incoming value
            let curr_check = dataRows[i][checkValue]; // incoming check

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
        let projectHistoryText = "Bipolar Factor " +
            val +
            " was split into Factor " +
            val +
            "a and Factor " +
            val +
            "b";
        projectHistoryArray.push(projectHistoryText);

        store.setState({
            gridColDefsLoadingsTable: columnDefs,
            gridRowDataLoadingsTable: dataRows,
            projectHistoryArray: projectHistoryArray,
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
            bipolarIndexArray: bipolarIndexArray
        });
    }
};

export default splitBipolarFactor;
