import React, { useRef } from 'react';
import { AgGridReact } from '@ag-grid-community/react';
import { AllCommunityModules } from '@ag-grid-community/all-modules';
import factorState from '../../GlobalState/factorState';

const UnrotatedFactorTable = () => {
  const gridApi = useRef();
  // getState
  const numFacsForTableWidth = factorState((state) => state.numFacsForTableWidth);
  const gridColDefsFactorTable = factorState((state) => state.gridColDefsFactorTable);
  const gridRowDataFactorTable = factorState((state) => state.gridRowDataFactorTable);

  const onGridReady = (params) => {
    gridApi.current = params.api;
    gridApi.current.sizeColumnsToFit();
  };

  let widthVal = 80 + 190 + 90 * numFacsForTableWidth;
  widthVal += 'px';

  return (
    <div>
      <div style={{ marginTop: 30, width: widthVal }} className="ag-theme-fresh">
        <AgGridReact
          // properties
          ref={gridApi}
          columnDefs={gridColDefsFactorTable}
          rowData={gridRowDataFactorTable}
          // events
          onGridReady={onGridReady}
          modules={AllCommunityModules}
          domLayout={'autoHeight'}
        />
      </div>
    </div>
  );
};

export default UnrotatedFactorTable;
