import React, { useRef } from 'react';
import { view } from '@risingstack/react-easy-state';
import { AgGridReact } from '@ag-grid-community/react';
import { AllCommunityModules } from '@ag-grid-community/all-modules';
import i18n from 'i18next';
import getCalcState from '../../GlobalState/getCalcState';
import getOutputState from '../../GlobalState/getOutputState';

const getCurrentData = () => {
  const data = getCalcState('factorCorrelationsTableData');
  // remove unnecessary label at top
  data.shift();
  const numFacs2 = getOutputState('userSelectedFactors');

  const numFacs = numFacs2.length;
  // pull out header row
  const headerRow = data[3];

  // mutate header row to include translation
  for (let k = 1; k < headerRow.length; k += 1) {
    let factorText = i18n.t('Factor');
    let factorNum = headerRow[k].charAt(headerRow[k].length - 1);
    // for bipolar split - catch "1a" as factor number
    if (isNaN(+factorNum)) {
      factorNum = `${headerRow[k].charAt(headerRow[k].length - 2)}${factorNum}`;
    }
    headerRow[k] = `${factorText} ${factorNum}`;
  }

  return [data, numFacs, headerRow];
};

let gridRowDataFacCorrTable = [];
let gridColDefsFacCorrTable = [];

const getGridColDefsFacCorrTable = (data, numFacs, headerRow) => {
  gridColDefsFacCorrTable = [
    {
      headerName: '',
      field: 'factorList',
      pinned: true,
      editable: false,
      width: 180,
      cellStyle: {
        textAlign: 'center'
      }
    }
  ];

  for (let i = 1; i < numFacs + 1; i++) {
    gridColDefsFacCorrTable.push({
      headerName: headerRow[i],
      field: headerRow[i],
      pinned: false,
      editable: false,
      sortable: true,
      width: 90,
      cellStyle: {
        textAlign: 'center'
      }
    }); // end push
  } // end loop

  return gridColDefsFacCorrTable;
};

const getGridRowDataFacCorrTable = (data, headerRow) => {
  gridRowDataFacCorrTable = [];

  for (let j = 4; j < data.length; j++) {
    // let responNum = j + 1;
    const tempObj = {};
    let iterator = j - 3;
    // tempObj.factorList = data[j][0];
    tempObj.factorList = headerRow[iterator];

    for (let k = 1; k < headerRow.length; k++) {
      tempObj[headerRow[k]] = data[j][k];
    }
    gridRowDataFacCorrTable.push(tempObj);
  }
  return gridRowDataFacCorrTable;
};

const FactorCorrelationsTable = () => {
  const gridApi = useRef();

  const onGridReady = (params) => {
    gridApi.current = params.api;
    gridApi.current.sizeColumnsToFit();
  };

  const currentData = getCurrentData();

  let widthVal = 182 + 90 * currentData[1];
  if (widthVal > window.innerWidth - 100) {
    widthVal = window.innerWidth - 100;
  }
  widthVal += 'px';

  gridColDefsFacCorrTable = getGridColDefsFacCorrTable(...currentData); // state.getState("gridColDefsFacTableEigen");
  gridRowDataFacCorrTable = getGridRowDataFacCorrTable(currentData[0], currentData[2]);

  return (
    <div>
      <div style={{ height: 'auto', width: widthVal }} className="ag-theme-fresh">
        <AgGridReact
          id="facCorTable"
          ref={gridApi}
          columnDefs={gridColDefsFacCorrTable}
          rowData={gridRowDataFacCorrTable}
          onGridReady={onGridReady}
          modules={AllCommunityModules}
          domLayout={'autoHeight'}
        />
      </div>
    </div>
  );
};

export default view(FactorCorrelationsTable);
