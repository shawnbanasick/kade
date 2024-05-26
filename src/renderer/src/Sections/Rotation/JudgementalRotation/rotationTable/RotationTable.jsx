import React from 'react';
import { AgGridReact } from '@ag-grid-community/react';
import { AllCommunityModules } from '@ag-grid-community/all-modules';

import { useTranslation } from 'react-i18next';
import getCorrelationState from '../../../GlobalState/getCorrelationState';

const RotationTable = (props) => {
  const { t } = useTranslation();

  // const onGridReady = params => {
  //   gridApi = params.api;
  //   columnApi = params.columnApi;
  // };

  // getState
  const colMaxWidth = getCorrelationState('colMaxWidth');
  const rowData = props.rowData;
  const colDefs = props.colDefs;
  const maxHeight = props.maxHeight;
  let heightVal = rowData.length * 28 + 13;

  if (heightVal > maxHeight) {
    heightVal = maxHeight;
  }

  const containerStyle = {
    marginTop: 10,
    height: heightVal,
    width: colMaxWidth + 390,
  };

  return (
    <div>
      <p style={{ marginTop: 15, fontWeight: 300, fontSize: 14 }}>
        {t('Highlighting levels are set by the flagging options in Section 6 Loadings')}{' '}
      </p>
      <div style={containerStyle} className="ag-theme-fresh">
        <AgGridReact columnDefs={colDefs} rowData={rowData} modules={AllCommunityModules} />
      </div>
    </div>
  );
};

export default RotationTable;
