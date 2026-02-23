import { useEffect, useCallback, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import factorState from '../../GlobalState/factorState';

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

const EigenTable = () => {
  const gridRef = useRef();
  const gridColDefsFacTableEigen = factorState((state) => state.gridColDefsFacTableEigen);
  const gridRowDataFacTableEigen = factorState((state) => state.gridRowDataFacTableEigen);

  const sizeToFit = useCallback(() => {
    gridRef.current?.api?.sizeColumnsToFit();
  }, []);

  useEffect(() => {
    window.addEventListener('resize', sizeToFit);
    return () => window.removeEventListener('resize', sizeToFit);
  }, [sizeToFit]);

  const style2 = {
    marginTop: 30,
    width: '100%', // Let the container fill available space
    height: getHeight(3),
  };

  let gridOptions = {
    suppressRowHoverHighlight: false,
    columnHoverHighlight: true,
    enableSorting: true,
    theme: 'legacy',
  };

  return (
    <div className="w-full min-w-0 max-w-[1400px] overflow-hidden">
      <div id="eigenTable" style={style2} className="ag-theme-fresh">
        <AgGridReact
          ref={gridRef}
          columnDefs={gridColDefsFacTableEigen}
          rowData={gridRowDataFacTableEigen}
          gridOptions={gridOptions}
          animateRows={true}
          enableBrowserTooltips={true}
          onGridReady={sizeToFit} // Fit on initial load
          onGridColumnsChanged={sizeToFit} // Fit when columns change
        />
      </div>
    </div>
  );
};

export default EigenTable;
