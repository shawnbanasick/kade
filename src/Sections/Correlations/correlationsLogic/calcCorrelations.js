import cloneDeep from "lodash/cloneDeep";
import store from "../../../store";
import getPqmethodCorrelation from "./getPqmethodCorrelation";

export default function calculateCorrelations(rawSorts, respondentNames) {
  // controls matrix formation - corrs calculated in "getPqmethodCorrelations"

  // todo - remove unnecessary correlationtablearray code - only using formatted array
  const totalSorts = respondentNames.length;
  const rawSortsCloned = cloneDeep(rawSorts);
  const correlationTableArray = [];
  const correlationTableArrayFormatted = [];

  for (let m = 0; m < totalSorts; m += 1) {
    correlationTableArray[m] = [];
  }

  for (let n = 0; n < totalSorts; n += 1) {
    correlationTableArrayFormatted[n] = [];
  }

  for (let i = 0; i < totalSorts; i += 1) {
    const pullX = rawSortsCloned[i];

    const correlationValue = getPqmethodCorrelation(
      rawSortsCloned[i],
      rawSortsCloned[i]
    );

    correlationTableArray[0][0] = correlationValue[0];
    correlationTableArrayFormatted[0][0] = correlationValue[1];

    for (let k = i; k < totalSorts; k += 1) {
      const correlationValue2 = getPqmethodCorrelation(
        pullX,
        rawSortsCloned[k]
      );

      correlationTableArray[i][k] = correlationValue2[0];
      correlationTableArrayFormatted[i][k] = correlationValue2[1];

      if (k !== i) {
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
  const tempObj2 = {};
  tempObj2.headerName = "Respondent";
  tempObj2.field = "respondent";
  tempObj2.pinned = true;
  tempObj2.width = 150;
  tempObj2.cellStyle = {
    textAlign: "center"
  };
  gridColDefs.push(tempObj2);
  respondentNames.forEach(element => {
    const tempObj3 = {};
    tempObj3.headerName = element;
    tempObj3.field = element;
    tempObj3.pinned = false;
    tempObj3.editable = false;
    tempObj3.width = 80;
    tempObj3.cellStyle = params => {
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
    gridColDefs.push(tempObj3);
  });

  // push data objects to STATE
  store.setState({
    gridColDefs,
    gridRowData,
    correlationTableArray: correlationTableArrayFormatted,
    correlation5Calcs: correlationTableArray
  });
}
