import React, { useRef } from "react";
import { view } from "react-easy-state";
import { AgGridReact } from "@ag-grid-community/react";
import { AllCommunityModules } from "@ag-grid-community/all-modules";
import factorState from "../../GlobalState/factorState";

const clone = require("rfdc")();

const UnrotatedFactorTable = () => {
  const gridApi = useRef();

  const onGridReady = params => {
    gridApi.current = params.api;
    gridApi.current.sizeColumnsToFit();
  };

  // getState
  const numFacsForTableWidth = factorState.numFacsForTableWidth;
  const gridColDefsFactorTable = clone(factorState.gridColDefsFactorTable);
  const gridRowDataFactorTable = clone(factorState.gridRowDataFactorTable);

  let widthVal = 80 + 190 + 90 * numFacsForTableWidth;
  widthVal += "px";

  return (
    <div>
      <div
        style={{ marginTop: 30, width: widthVal }}
        className="ag-theme-fresh"
      >
        <AgGridReact
          // properties
          ref={gridApi}
          columnDefs={gridColDefsFactorTable}
          rowData={gridRowDataFactorTable}
          // events
          onGridReady={onGridReady}
          modules={AllCommunityModules}
          domLayout={"autoHeight"}
        />
      </div>
    </div>
  );
};

export default view(UnrotatedFactorTable);
