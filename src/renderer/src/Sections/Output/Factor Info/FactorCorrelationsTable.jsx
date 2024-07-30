import { useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import i18n from 'i18next';
import calcState from '../../GlobalState/calcState';
import outputState from '../../GlobalState/outputState';
import cloneDeep from 'lodash/cloneDeep';

const FactorCorrelationsTable = () => {
  const data = cloneDeep(calcState((state) => state.factorCorrelationsTableData));
  data.shift();
  console.log(JSON.stringify(data));
  const userSelectedFacs = outputState((state) => state.userSelectedFactors);
  console.log(JSON.stringify(userSelectedFacs));
  const gridApi = useRef();

  // remove unnecessary label at top

  const numFacs = userSelectedFacs.length;
  console.log(numFacs);
  // pull out header row
  const headerRow = data[3];
  console.log(headerRow);

  // new header row to include translation
  let newHeaderRow = [];
  userSelectedFacs.forEach((element) => {
    let factorText = i18n.t('Factor');
    let factorNum = element.charAt(element.length - 1);
    if (isNaN(+factorNum)) {
      factorNum = `${element.charAt(element.length - 2)}${factorNum}`;
    }
    newHeaderRow.push(`${factorText} ${factorNum}`);
  });
  newHeaderRow.unshift('');
  // for (let k = 1; k < headerRow.length; k += 1) {
  //   console.log(headerRow[k]);
  //   let factorText = i18n.t('Factor');
  //   let factorNum = headerRow[k].charAt(headerRow[k].length - 1);
  //   // for bipolar split - catch "1a" as factor number
  //   if (isNaN(+factorNum)) {
  //     factorNum = `${headerRow[k].charAt(headerRow[k].length - 2)}${factorNum}`;
  //   }
  //   newHeaderRow[k] = `${factorText} ${factorNum}`;
  // }

  console.log(JSON.stringify(data), numFacs, JSON.stringify(newHeaderRow));

  // return [data, numFacs, newHeaderRow];

  let gridRowDataFacCorrTable = [];
  let gridColDefsFacCorrTable = [];

  const getGridColDefsFacCorrTable = (data, numFacs, headerRow) => {
    console.log(JSON.stringify(data, null, 2), numFacs, JSON.stringify(headerRow));
    gridColDefsFacCorrTable = [
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

    for (let i = 1; i < numFacs + 1; i++) {
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
    console.log(JSON.stringify(gridColDefsFacCorrTable, null, 2));
    return gridColDefsFacCorrTable;
  };

  const getGridRowDataFacCorrTable = (data, headerRow) => {
    console.log(JSON.stringify(data, null, 2), JSON.stringify(headerRow));
    data.shift();
    gridRowDataFacCorrTable = [];

    for (let j = 3; j < data.length; j++) {
      // let responNum = j + 1;
      const tempObj = {};
      let iterator = j - 2;
      // tempObj.factorList = data[j][0];
      tempObj.factorList = headerRow[iterator];

      for (let k = 0; k < headerRow.length; k++) {
        tempObj[headerRow[k]] = data[j][k];
      }
      gridRowDataFacCorrTable.push(tempObj);
    }
    console.log(JSON.stringify(gridRowDataFacCorrTable, null, 2));
    return gridRowDataFacCorrTable;
  };

  let gridOptions = {
    suppressRowHoverHighlight: false,
    columnHoverHighlight: true,
    enableSorting: true,
  };

  const currentData = [data, numFacs, newHeaderRow];

  let widthVal = 182 + 91 * currentData[1];
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
          gridOptions={gridOptions}
          domLayout={'autoHeight'}
        />
      </div>
    </div>
  );
};

export default FactorCorrelationsTable;
