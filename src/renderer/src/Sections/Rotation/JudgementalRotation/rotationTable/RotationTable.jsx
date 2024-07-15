import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { useTranslation } from 'react-i18next';
import correlationState from '../../../GlobalState/correlationState';

const RotationTable = (props) => {
  const { t } = useTranslation();

  // getState
  const colMaxWidth = correlationState((state) => state.colMaxWidth);
  const rowData = props.rowData;
  const colDefs = props.colDefs;
  const maxHeight = props.maxHeight;
  let heightVal = rowData.length * 28 + 13;

  if (heightVal > maxHeight) {
    heightVal = maxHeight;
  }

  let gridOptions = {
    suppressRowHoverHighlight: false,
    columnHoverHighlight: true,
    enableSorting: true,
  };

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
        <AgGridReact
          columnDefs={colDefs}
          rowData={rowData}
          gridOptions={gridOptions}
          animateRows={true}
          enableBrowserTooltips={true}
        />
      </div>
    </div>
  );
};

export default RotationTable;
