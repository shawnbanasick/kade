import cloneDeep from "lodash/cloneDeep";
import store from "../../../store";
import getPqmethodCorrelation from "./getPqmethodCorrelation";

export default function calculateCorrelations(rawSorts, respondentNames) {
    // controls matrix formation - corrs calculated in "getPqmethodCorrelations"

    //
    // todo - remove unnecessary correlationtablearray code - only using formatted array
    let totalSorts = respondentNames.length;
    let rawSortsCloned = cloneDeep(rawSorts);
    let correlationTableArray = [];
    let correlationTableArrayFormatted = [];

    for (let m = 0; m < totalSorts; m++) {
        correlationTableArray[m] = [];
    }

    for (let n = 0; n < totalSorts; n++) {
        correlationTableArrayFormatted[n] = [];
    }

    for (let i = 0; i < totalSorts; i++) {
        let pullX = rawSortsCloned[i];

        let correlationValue = getPqmethodCorrelation(
            rawSortsCloned[i],
            rawSortsCloned[i]
        );

        correlationTableArray[0][0] = correlationValue[0];
        correlationTableArrayFormatted[0][0] = correlationValue[1];

        for (let k = i; k < totalSorts; k++) {
            let correlationValue2 = getPqmethodCorrelation(pullX, rawSortsCloned[k]);

            correlationTableArray[i][k] = correlationValue2[0];
            correlationTableArrayFormatted[i][k] = correlationValue2[1];

            if (k === i) {
            } else {
                // var nextArray = k + 1;
                correlationTableArray[k][i] = correlationValue2[0];
                correlationTableArrayFormatted[k][i] = correlationValue2[1];
            }
        } // end of k loop
    } //  end of i loop

    // generate row data for ag-grid corr table
    const gridRowData = [];
    correlationTableArrayFormatted.forEach((element, j) => {
        const tempObj = {};
        tempObj.respondent = respondentNames[j];
        element.forEach((data, k) => {
            const key = respondentNames[k];
            tempObj[key] = data;
        });
        gridRowData.push(tempObj);
    });

    // generate column definitions
    const gridColDefs = [];
    let tempObj2 = {};
    tempObj2.headerName = "Respondent";
    tempObj2.field = "respondent";
    tempObj2.pinned = true;
    tempObj2.width = 150;
    // tempObj2.sortable = true;
    tempObj2.cellStyle = {
        textAlign: "center"
    // backgroundColor: "#eee"
    };
    gridColDefs.push(tempObj2);
    respondentNames.forEach((element, m) => {
        tempObj2 = {};
        tempObj2.headerName = element;
        tempObj2.field = element;
        tempObj2.pinned = false;
        tempObj2.editable = false;
        tempObj2.width = 75;
        // tempObj2.sortable = true;
        tempObj2.cellStyle = function(params) {
            if (params.value < 0) {
                return {
                    textAlign: "right",
                    color: "red"
                };
            } 
                return {
                    textAlign: "right"
                };
            
        };
        gridColDefs.push(tempObj2);
    });

    // push data objects to STATE
    store.setState({
        gridColDefs,
        gridRowData,
        correlationTableArray: correlationTableArrayFormatted,
        correlation5Calcs: correlationTableArray,
    });
}
