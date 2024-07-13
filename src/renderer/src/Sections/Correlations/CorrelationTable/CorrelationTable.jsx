import { useEffect } from 'react';
import styled from 'styled-components';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import coreState from '../../GlobalState/coreState';
import correlationState from '../../GlobalState/correlationState';
import { useTranslation } from 'react-i18next';

// HELPER FUNCTION
function getWidth(numQsorts, width1, width2) {
  let widthVal = width1 + 10 + width2 * numQsorts;
  let x = window.innerWidth - 40 - 152;

  if (x < widthVal) {
    x += 'px';
    return x;
  }
  widthVal += 'px';
  return widthVal;
}

// HELPER FUNCTION
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

// HELPER FUNCTION
function resetWidthAndHeight(numQsorts, width1, width2) {
  const table = document.querySelector('#innerContainerCorrelations');
  if (table !== null) {
    table.style.height = getHeight(numQsorts);
    table.style.width = getWidth(numQsorts, width1, width2);
  }
}

const CorrelationTable = () => {
  const { t } = useTranslation();

  const gridColDefs = correlationState((state) => state.gridColDefs);
  const gridRowData = correlationState((state) => state.gridRowData);
  const numQsorts = coreState((state) => state.numQsorts);
  const width1 = correlationState((state) => state.firstColMaxWidth);
  const width2 = correlationState((state) => state.colMaxWidth);

  let gridOptions = {
    suppressRowHoverHighlight: false,
    columnHoverHighlight: true,
    enableSorting: true,
  };

  useEffect(() => {
    window.addEventListener('resize', () => {
      resetWidthAndHeight(numQsorts, width1, width2);
    });

    return () => {
      window.removeEventListener('resize', () => {
        resetWidthAndHeight(numQsorts, width1, width2);
      });
    };
  }, []);

  const style1 = { fontWeight: 'normal', marginTop: 15, textAlign: 'left' };
  const style2 = { width: getWidth(numQsorts, width1, width2), height: getHeight(numQsorts) };

  return (
    <TableHolder>
      <p style={style1}>
        {t('Click the table headers to re-sort by column')}{' '}
        {t('(low-to-high, high-to-low, original sort)')}
      </p>
      <div id="innerContainerCorrelations" style={style2} className="ag-theme-fresh">
        <AgGridReact
          columnDefs={gridColDefs}
          rowData={gridRowData}
          gridOptions={gridOptions}
          animateRows={true}
          enableBrowserTooltips={true}
        />
      </div>
    </TableHolder>
  );
};

export default CorrelationTable;

const TableHolder = styled.div``;
