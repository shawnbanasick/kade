import { useEffect, useCallback, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import factorState from '../../GlobalState/factorState';
import coreState from '../../GlobalState/coreState';

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

const UnrotatedFactorTable = () => {
  const gridRef = useRef();
  const containerRef = useRef();
  const gridColDefsFactorTable = factorState((state) => state.gridColDefsFactorTable);
  const gridRowDataFactorTable = factorState((state) => state.gridRowDataFactorTable);
  const numQsorts = coreState((state) => state.numQsorts);

  const sizeToFit = useCallback(() => {
    gridRef.current?.api?.sizeColumnsToFit();
  }, []);

  // ResizeObserver watches the container div itself, not the window,
  // so it responds to any layout shift (sidebar toggle, panel resize, etc.)
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver(() => sizeToFit());
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [sizeToFit]);

  let gridOptions = {
    suppressRowHoverHighlight: false,
    columnHoverHighlight: true,
    enableSorting: true,
    theme: 'legacy',
  };

  const style2 = {
    marginTop: 30,
    width: '100%',
    height: getHeight(numQsorts),
  };

  return (
    <div ref={containerRef} className="w-full min-w-0 max-w-[1400px] overflow-hidden">
      <div id="unRotatedFactorTable" style={style2} className="ag-theme-fresh">
        <AgGridReact
          ref={gridRef}
          columnDefs={gridColDefsFactorTable}
          rowData={gridRowDataFactorTable}
          gridOptions={gridOptions}
          animateRows={true}
          enableBrowserTooltips={true}
          onGridReady={sizeToFit}
          onGridColumnsChanged={sizeToFit}
        />
      </div>
    </div>
  );
};

export default UnrotatedFactorTable;
