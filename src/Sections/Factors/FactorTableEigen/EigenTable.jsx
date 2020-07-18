import React, { useRef } from "react";
import { view } from "react-easy-state";
import { AgGridReact } from "@ag-grid-community/react";
import { AllCommunityModules } from "@ag-grid-community/all-modules";
import factorState from "../../GlobalState/factorState";

const clone = require("rfdc")();

const EigenTable = () => {
  const gridApi = useRef();

  const onGridReady = params => {
    gridApi.current = params.api;
    gridApi.current.sizeColumnsToFit();
  };

  // getState
  const numFacsForTableWidth = factorState.numFacsForTableWidth;
  let widthVal = 285 + 90 * numFacsForTableWidth;
  widthVal += "px";

  // getState
  const gridColDefsFacTableEigen = clone(factorState.gridColDefsFacTableEigen);
  const gridRowDataFacTableEigen = clone(factorState.gridRowDataFacTableEigen);

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
            domLayout={"autoHeight"}
          />
        </div>
      </div>
    </div>
  );
};

export default view(EigenTable);

// className="ag-theme-fresh"
