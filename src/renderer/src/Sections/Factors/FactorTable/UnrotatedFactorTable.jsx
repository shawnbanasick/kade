import React, { useRef } from 'react';

import { AgGridReact } from '@ag-grid-community/react';
import { AllCommunityModules } from '@ag-grid-community/all-modules';
import getFactorState from '../../GlobalState/getFactorState';

const UnrotatedFactorTable = () => {
  const gridApi = useRef();

  const onGridReady = (params) => {
    gridApi.current = params.api;
    gridApi.current.sizeColumnsToFit();
  };

  // getState
  const numFacsForTableWidth = getFactorState('numFacsForTableWidth');
  const gridColDefsFactorTable = getFactorState('gridColDefsFactorTable');
  const gridRowDataFactorTable = getFactorState('gridRowDataFactorTable');

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
