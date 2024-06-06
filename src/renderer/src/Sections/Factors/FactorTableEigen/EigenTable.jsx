import React, { useRef } from 'react';
import { AgGridReact } from '@ag-grid-community/react';
import { AllCommunityModules } from '@ag-grid-community/all-modules';
import factorState from '../../GlobalState/factorState';

const EigenTable = () => {
  const gridApi = useRef();
  const numFacsForTableWidth = factorState((state) => state.numFacsForTableWidth);
  // getState
  const gridColDefsFacTableEigen = factorState((state) => state.gridColDefsFacTableEigen);
  const gridRowDataFacTableEigen = factorState((state) => state.gridRowDataFacTableEigen);

  const onGridReady = (params) => {
    gridApi.current = params.api;
    gridApi.current.sizeColumnsToFit();
  };

  // getState
  let widthVal = 285 + 90 * numFacsForTableWidth;
  widthVal += 'px';

  return (
    <div style={{ marginTop: 30, height: 200, width: widthVal }}>
      <div className="ag-theme-fresh">
        <div>
          <AgGridReact
            ref={gridApi}
            columnDefs={gridColDefsFacTableEigen}
            rowData={gridRowDataFacTableEigen}
            onGridReady={onGridReady}
            modules={AllCommunityModules}
            domLayout={'autoHeight'}
          />
        </div>
      </div>
    </div>
  );
};

export default EigenTable;

// className="ag-theme-fresh"
