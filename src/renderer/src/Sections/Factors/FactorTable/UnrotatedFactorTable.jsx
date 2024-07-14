import { useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import factorState from '../../GlobalState/factorState';
import coreState from '../../GlobalState/coreState';

// HELPER FUNCTION
function getWidth(numFacsForTableWidth, width1, width2) {
  let widthVal = width1 + 10 + width2 * numFacsForTableWidth;
  let x = window.innerWidth - 265;

  if (x < widthVal) {
    x += 'px';
    return x;
  }

  if (widthVal > 985) {
    widthVal = 985;
  }

  widthVal += 'px';
  return widthVal;
}

// HELPER FUNCTION
function getHeight(numQsorts) {
  let heightVal = 40 + 25 * numQsorts;
  let y = window.innerHeight - 140;
  if (y < heightVal) {
    y += 'px';
    return y;
  }
  heightVal += 'px';
  return heightVal;
}

// HELPER FUNCTION
function resetWidthAndHeight(numQsorts, width1, width2, numFacsForTableWidth) {
  const table = document.querySelector('#unRotatedFactorTable');
  if (table !== null) {
    table.style.height = getHeight(numQsorts);
    table.style.width = getWidth(numFacsForTableWidth, width1, width2);
  }
}

const UnrotatedFactorTable = () => {
  // getState
  let numFacsForTableWidth = factorState((state) => state.numFacsForTableWidth);
  const gridColDefsFactorTable = factorState((state) => state.gridColDefsFactorTable);
  const gridRowDataFactorTable = factorState((state) => state.gridRowDataFactorTable);
  const numQsorts = coreState((state) => state.numQsorts);

  // const onGridReady = (params) => {
  //   gridApi.current = params.api;
  //   gridApi.current.sizeColumnsToFit();
  // };

  let gridOptions = {
    suppressRowHoverHighlight: false,
    columnHoverHighlight: true,
    enableSorting: true,
  };

  // let widthVal = 80 + 190 + 90 * numFacsForTableWidth;
  // widthVal += 'px';

  useEffect(() => {
    window.addEventListener('resize', () => {
      resetWidthAndHeight(numQsorts, 250, 100, numFacsForTableWidth);
    });

    return () => {
      window.removeEventListener('resize', () => {
        resetWidthAndHeight(numQsorts, 250, 100, numFacsForTableWidth);
      });
    };
  }, []);

  const style2 = {
    marginTop: 30,
    width: getWidth(numFacsForTableWidth, 250, 100),
    height: getHeight(numQsorts),
  };

  return (
    <div>
      <div id="unRotatedFactorTable" style={style2} className="ag-theme-fresh">
        <AgGridReact
          // properties
          columnDefs={gridColDefsFactorTable}
          rowData={gridRowDataFactorTable}
          // events
          gridOptions={gridOptions}
          animateRows={true}
          enableBrowserTooltips={true}
          // onGridReady={onGridReady}
          // modules={AllCommunityModules}
          // domLayout={'autoHeight'}
        />
      </div>
    </div>
  );
};

export default UnrotatedFactorTable;
