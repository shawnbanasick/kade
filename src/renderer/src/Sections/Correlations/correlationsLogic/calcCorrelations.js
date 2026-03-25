import correlationState from '../../GlobalState/correlationState';
import cloneDeep from 'lodash/cloneDeep';
import i18n from 'i18next';
import getPqmethodCorrelation from './getPqmethodCorrelation';

export default function calculateCorrelations(rawSorts, respondentNames) {
  const participantTrans = i18n.t('Participant');

  // controls matrix formation - corrs calculated in "getPqmethodCorrelations"

  // todo - clean up! and add unit tests
  // todo - remove unnecessary correlationtablearray code - only using formatted array
  const totalSorts = respondentNames.length;
  const rawSortsCloned = cloneDeep(rawSorts);
  const correlationTableArray = [];
  const correlationTableArrayFormatted = [];

  const firstColMaxWidth = correlationState.getState().firstColMaxWidth;
  const colMaxWidth = correlationState.getState().colMaxWidth;

  for (let m = 0; m < totalSorts; m += 1) {
    correlationTableArray[m] = [];
    correlationTableArrayFormatted[m] = [];
  }

  for (let i = 0; i < totalSorts; i += 1) {
    const pullX = rawSortsCloned[i];

    const correlationValue = getPqmethodCorrelation(rawSortsCloned[i], rawSortsCloned[i]);

    correlationTableArray[0][0] = correlationValue[0];
    correlationTableArrayFormatted[0][0] = correlationValue[1];

    for (let k = i; k < totalSorts; k += 1) {
      const correlationValue2 = getPqmethodCorrelation(pullX, rawSortsCloned[k]);

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

  // generate row data for ag-grid corr table
  const forcedGraphDataAll = [];
  const forcedGraphDataPos = [];
  const forcedGraphDataNeg = [];
  correlationTableArrayFormatted.forEach((element, j) => {
    const tempObjAll = {};
    const tempObjPos = {};
    const tempObjNeg = {};
    tempObjAll.respondent = `${(j + 1).toString()}`;
    tempObjPos.respondent = `${(j + 1).toString()}`;
    tempObjNeg.respondent = `${(j + 1).toString()}`;
    element.forEach((data, k) => {
      const key = `${(k + 1).toString()}`;
      tempObjAll[key] = data;
      if (data > 0) {
        tempObjPos[key] = data;
      } else {
        tempObjPos[key] = 0;
      }
      if (data < 0) {
        tempObjNeg[key] = data;
      } else {
        tempObjNeg[key] = 0;
      }
    });
    forcedGraphDataAll.push(tempObjAll);
    forcedGraphDataPos.push(tempObjPos);
    forcedGraphDataNeg.push(tempObjNeg);
  });

  // console.log('forcedGraphDataAll', JSON.stringify(forcedGraphDataAll, null, 2));
  // console.log('forcedGraphDataPos', JSON.stringify(forcedGraphDataPos, null, 2));
  // console.log('forcedGraphDataNeg', JSON.stringify(forcedGraphDataNeg, null, 2));

  // generate column definitions
  const gridColDefs = [];
  const tempObj2 = {};
  tempObj2.headerName = participantTrans;
  tempObj2.field = 'respondent';
  tempObj2.pinned = true;
  tempObj2.sortable = true;
  tempObj2.width = firstColMaxWidth;
  tempObj2.cellStyle = {
    textAlign: 'center',
  };
  gridColDefs.push(tempObj2);
  respondentNames.forEach((element) => {
    const tempObj3 = {};
    tempObj3.headerName = element;
    tempObj3.field = element;
    tempObj3.pinned = false;
    tempObj3.sortable = true;
    tempObj3.editable = false;
    tempObj3.width = colMaxWidth;
    tempObj3.cellStyle = (params) => {
      if (params.value < 0) {
        return {
          textAlign: 'right',
          color: 'red',
        };
      }
      return {
        textAlign: 'right',
      };
    };
    gridColDefs.push(tempObj3);
  });

  // push data objects to STATE
  correlationState.setState({ gridColDefs: gridColDefs });
  correlationState.setState({ gridRowData: gridRowData });
  correlationState.setState({ forcedGraphDataAll: forcedGraphDataAll });
  correlationState.setState({ forcedGraphDataPos: forcedGraphDataPos });
  correlationState.setState({ forcedGraphDataNeg: forcedGraphDataNeg });
  correlationState.setState({ correlationTableArray: correlationTableArrayFormatted });
  correlationState.setState({ correlation5Calcs: correlationTableArray });
}
