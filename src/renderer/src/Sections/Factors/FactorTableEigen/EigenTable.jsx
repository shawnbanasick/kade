import { useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import factorState from '../../GlobalState/factorState';

// HELPER FUNCTION
function getWidth(numFacsForTableWidth, width1, width2) {
  let widthVal = width1 + 10 + width2 * numFacsForTableWidth;
  let x = window.innerWidth - 265;

  if (x < widthVal) {
    x += 'px';
    return x;
  }

  if (widthVal > 1010) {
    widthVal = 1010;
  }

  widthVal += 'px';
  return widthVal;
}

// HELPER FUNCTION
function getHeight(numRows) {
  let heightVal = 40 + 25 * numRows;
  let y = window.innerHeight - 140;
  if (y < heightVal) {
    y += 'px';
    return y;
  }
  heightVal += 'px';
  return heightVal;
}

// HELPER FUNCTION
function resetWidthAndHeight(numRows, width1, width2, numFacsForTableWidth) {
  const table = document.querySelector('#eigenTable');
  if (table !== null) {
    table.style.height = getHeight(numRows);
    table.style.width = getWidth(numFacsForTableWidth, width1, width2);
  }
}

const EigenTable = () => {
  // const gridApi = useRef();
  const numFacsForTableWidth = factorState((state) => state.numFacsForTableWidth);
  // getState
  const gridColDefsFacTableEigen = factorState((state) => state.gridColDefsFacTableEigen);
  const gridRowDataFacTableEigen = factorState((state) => state.gridRowDataFacTableEigen);

  useEffect(() => {
    window.addEventListener('resize', () => {
      resetWidthAndHeight(3, 250, 100, numFacsForTableWidth);
    });

    return () => {
      window.removeEventListener('resize', () => {
        resetWidthAndHeight(3, 250, 100, numFacsForTableWidth);
      });
    };
  }, []);

  let gridOptions = {
    suppressRowHoverHighlight: false,
    columnHoverHighlight: true,
    enableSorting: true,
  };

  useEffect(() => {
    window.addEventListener('resize', () => {
      resetWidthAndHeight(3, 250, 100, numFacsForTableWidth);
    });

    return () => {
      window.removeEventListener('resize', () => {
        resetWidthAndHeight(3, 250, 100, numFacsForTableWidth);
      });
    };
  }, []);

  // getState
  // let widthVal = 285 + 90 * numFacsForTableWidth;
  // widthVal += 'px';

  const style2 = {
    marginTop: 30,
    width: getWidth(numFacsForTableWidth, 250, 100),
    height: getHeight(3),
  };

  return (
    <div>
      <div id="eigenTable" style={style2} className="ag-theme-fresh">
        <AgGridReact
          columnDefs={gridColDefsFacTableEigen}
          rowData={gridRowDataFacTableEigen}
          // events
          gridOptions={gridOptions}
          animateRows={true}
          enableBrowserTooltips={true}
        />
      </div>
    </div>
  );
};

export default EigenTable;

// className="ag-theme-fresh"
