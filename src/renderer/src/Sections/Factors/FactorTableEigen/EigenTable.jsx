import React, { useRef } from 'react';

import { AgGridReact } from '@ag-grid-community/react';
import { AllCommunityModules } from '@ag-grid-community/all-modules';
import getFactorState from '../../GlobalState/getFactorState';

const EigenTable = () => {
  const gridApi = useRef();

  const onGridReady = (params) => {
    gridApi.current = params.api;
    gridApi.current.sizeColumnsToFit();
  };

  // getState
  const numFacsForTableWidth = getFactorState('numFacsForTableWidth');
  let widthVal = 285 + 90 * numFacsForTableWidth;
  widthVal += 'px';

  // getState
  const gridColDefsFacTableEigen = getFactorState('gridColDefsFacTableEigen');
  const gridRowDataFacTableEigen = getFactorState('gridRowDataFacTableEigen');

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
