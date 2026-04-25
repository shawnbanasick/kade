import { useEffect, useCallback, useRef, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import factorState from '../../GlobalState/factorState';
import structureState from '../../GlobalState/structureState';

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
  const gridColDefsFacTableEigenPrepped = factorState((state) => state.gridColDefsFacTableEigenPrepped);
  const gridRowDataFacTableEigenPrepped = factorState((state) => state.gridRowDataFacTableEigenPrepped);
  const parallelMeans = factorState((state) => state.parallelMeans);
  const parallel95 = factorState((state) => state.parallel95);
  const eigensTranslations = factorState((state) => state.eigensTranslations);
  
  const sizeToFit = useCallback(() => {
    gridRef.current?.api?.sizeColumnsToFit();
  }, []);
  
  useEffect(() => {
    window.addEventListener('resize', sizeToFit);
    return () => window.removeEventListener('resize', sizeToFit);
  }, [sizeToFit]);


  const parallelMeansObject = {};
  const parallel95Object = {};
  parallelMeansObject.EigenList = eigensTranslations.parallelMeansTrans;
  parallel95Object.EigenList = eigensTranslations.parallel95Trans;
  parallelMeans.forEach((array, index) => {
    parallelMeansObject[`factor${index + 1}`] = parallelMeans[index][1];
    parallel95Object[`factor${index + 1}`] = parallel95[index][1];
  });

const rowDataWithParallel = useMemo(() => [
  gridRowDataFacTableEigenPrepped[0],
  parallelMeansObject,
  parallel95Object,
  ...gridRowDataFacTableEigenPrepped.slice(1),
], [gridRowDataFacTableEigenPrepped, parallelMeans, parallel95]);



const height = getHeight(rowDataWithParallel?.length) || '300px';
  
const style2 = {
    marginTop: 30,
    width: '100%', // Let the container fill available space
    height: height, // Dynamic height based on row count, with a default
  };

  let gridOptions = {
    suppressRowHoverHighlight: false,
    columnHoverHighlight: true,
    enableSorting: true,
    theme: 'legacy',
  };


  return (
    <div className="w-full min-w-0 max-w-350 overflow-hidden">
      <div id="eigenTable" style={style2} className="ag-theme-fresh">
        <AgGridReact
          ref={gridRef}
          columnDefs={gridColDefsFacTableEigenPrepped}
          rowData={rowDataWithParallel}
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
