import { useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import i18n from 'i18next';
import calcState from '../../GlobalState/calcState';
import outputState from '../../GlobalState/outputState';

const StandardErrorsDifferencesTable = () => {
  const data = calcState((state) => state.standardErrorDiffSheetArray);
  data.shift();
  const userSelectedFacs = outputState((state) => state.userSelectedFactors);

  const gridApi = useRef();
  let gridOptions = {
    suppressRowHoverHighlight: false,
    columnHoverHighlight: true,
    enableSorting: true,
  };

  const getGridColDefsFacCorrTable = (data, numFacs, headerRow) => {
    let gridColDefsFacCorrTable = [
      {
        headerName: '',
        field: 'factorList',
        pinned: true,
        editable: false,
        width: 180,
        cellStyle: {
          textAlign: 'center',
        },
      },
    ];

    for (let i = 1; i < numFacs + 1; i += 1) {
      gridColDefsFacCorrTable.push({
        headerName: headerRow[i],
        field: headerRow[i],
        pinned: false,
        editable: false,
        sortable: true,
        width: 90,
        cellStyle: {
          textAlign: 'center',
        },
      }); // end push
    } // end loop

    return gridColDefsFacCorrTable;
  };

  const getGridRowDataFacCorrTable = (data, headerRow) => {
    let gridRowDataFacCorrTable = [];

    for (let j = 4; j < data.length; j += 1) {
      // let responNum = j + 1;
      const tempObj = {};
      let iterator = j - 3;
      // tempObj.factorList = data[j][0];
      tempObj.factorList = headerRow[iterator];

      for (let k = 1; k < headerRow.length; k += 1) {
        tempObj[headerRow[k]] = data[j][k];
      }
      gridRowDataFacCorrTable.push(tempObj);
    }

    return gridRowDataFacCorrTable;
  };

  const numFacs = userSelectedFacs.length;
  console.log(numFacs);
  // pull out header row
  const headerRow = data[3];
  console.log(headerRow);

  // new header row to include translation
  let newHeaderRow = [''];
  userSelectedFacs.forEach((element) => {
    let factorText = i18n.t('Factor');
    let factorNum = element.charAt(element.length - 1);
    if (isNaN(+factorNum)) {
      factorNum = `${element.charAt(element.length - 2)}${factorNum}`;
    }
    newHeaderRow.push(`${factorText} ${factorNum}`);
  });
  newHeaderRow.unshift('');

  const onGridReady = (params) => {
    gridApi.current = params.api;
    gridApi.current.sizeColumnsToFit();
  };

  const currentData = [data, numFacs, newHeaderRow];

  let widthVal = 182 + 90 * currentData[1];
  if (widthVal > window.innerWidth - 100) {
    widthVal = window.innerWidth - 100;
  }
  widthVal += 'px';

  const gridColDefsFacCorrTable2 = getGridColDefsFacCorrTable(...currentData); // state.getState("gridColDefsFacTableEigen");
  const gridRowDataFacCorrTable2 = getGridRowDataFacCorrTable(currentData[0], currentData[2]);

  return (
    <div>
      <div style={{ height: 300, width: widthVal }} className="ag-theme-fresh">
        <AgGridReact
          ref={gridApi}
          columnDefs={gridColDefsFacCorrTable2}
          rowData={gridRowDataFacCorrTable2}
          gridOptions={gridOptions}
          domLayout={'autoHeight'}
        />
      </div>
    </div>
  );
};

export default StandardErrorsDifferencesTable;
