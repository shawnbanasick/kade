import { useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import i18n from 'i18next';
import calcState from '../../GlobalState/calcState';
import outputState from '../../GlobalState/outputState';

const FactorCharacteristicsTable = () => {
  const data = calcState((state) => state.FactorCharacteristicsArray);
  const userSelectedFacs = outputState((state) => state.userSelectedFactors);

  let gridRowDataFacCorrTable = [];
  let gridColDefsFacCorrTable = [];

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

  const getGridRowDataFacCorrTable = (data, headerRow, characteristicsArray) => {
    let gridRowDataFacCorrTable = [];

    for (let j = 4; j < data.length; j += 1) {
      // let responNum = j + 1;
      const tempObj = {};
      tempObj.factorList = characteristicsArray[j - 4];

      for (let k = 1; k < headerRow.length; k += 1) {
        tempObj[headerRow[k]] = data[j][k];
      }
      gridRowDataFacCorrTable.push(tempObj);
    }

    return gridRowDataFacCorrTable;
  };

  // getState
  data.shift();

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
  const gridApi = useRef();

  const onGridReady = (params) => {
    gridApi.current = params.api;
    gridApi.current.sizeColumnsToFit();
  };

  const characteristicsArray = [
    i18n.t('No of Defining Variables'),
    i18n.t('Avg Rel Coef'),
    i18n.t('Composite Reliability'),
    i18n.t('S E of Factor Zscores'),
  ];

  const currentData = [data, numFacs, newHeaderRow];

  let widthVal = 182 + 90 * currentData[1];
  if (widthVal > window.innerWidth - 100) {
    widthVal = window.innerWidth - 100;
  }
  widthVal += 'px';

  gridColDefsFacCorrTable = getGridColDefsFacCorrTable(...currentData); // state.getState("gridColDefsFacTableEigen");
  gridRowDataFacCorrTable = getGridRowDataFacCorrTable(
    currentData[0],
    currentData[2],
    characteristicsArray
  );

  return (
    <div>
      <div style={{ height: 140, width: widthVal }} className="ag-theme-fresh">
        <AgGridReact
          ref={gridApi}
          columnDefs={gridColDefsFacCorrTable}
          rowData={gridRowDataFacCorrTable}
          gridOptions={gridOptions}
          onGridReady={onGridReady}
          domLayout={'autoHeight'}
        />
      </div>
    </div>
  );
};

export default FactorCharacteristicsTable;
