import { useEffect, useCallback, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { useTranslation } from 'react-i18next';
import outputState from '../../GlobalState/outputState';
import coreState from '../../GlobalState/coreState';

function getHeight(numStatements) {
  let heightVal = 40 + 25 * numStatements;
  let y = window.innerHeight - 120 - 50;
  if (y < heightVal) {
    y += 'px';
    return y;
  }
  heightVal += 'px';
  return heightVal;
}

const FactorsTable = (props) => {
  const { t } = useTranslation();
  const gridRef = useRef();
  const gridColDefsFacTable = props.gridColDefsFacTable;
  const gridRowDataFacTable = props.gridRowDataFacTable;
  const displayOutputTabContent = outputState((state) => state.displayOutputTabContent);

  const numStatements = coreState((state) => state.numStatements);
  const showFactorsTable = outputState((state) => state.showFactorCorrelationsTable);

  const style2 = {
    marginTop: 30,
    width: '100%', // Let the container fill available space
    height: getHeight(numStatements),
  };

  const sizeToFit = useCallback(() => {
    const api = gridRef.current?.api;
    if (api) {
      api.sizeColumnsToFit();
    }
  }, []);

  useEffect(() => {
    const container = document.getElementById('FactorsTable');
    if (!container) return;

    const observer = new ResizeObserver(() => {
      const width = container.offsetWidth;
      sizeToFit();
    });

    observer.observe(container);
    return () => observer.disconnect();
  }, [sizeToFit]);

  // Keep the window resize listener for ongoing responsiveness
  useEffect(() => {
    window.addEventListener('resize', sizeToFit);
    return () => window.removeEventListener('resize', sizeToFit);
  }, [sizeToFit]);

  let gridOptions = {
    suppressRowHoverHighlight: false,
    columnHoverHighlight: true,
    enableSorting: true,
    theme: 'legacy',
  };

  if (displayOutputTabContent) {
    return (
      <div className={`flex flex-col w-full`}>
        <div className="text-4xl">{t('Factor Scores')}</div>
        <div className="flex flex-col overflow-hidden mb-10">
          <div id="FactorsTable" style={style2} className="ag-theme-fresh">
            <AgGridReact
              ref={gridRef}
              id="factorsTable"
              columnDefs={gridColDefsFacTable}
              rowData={gridRowDataFacTable}
              gridOptions={gridOptions}
              animateRows={true}
              enableBrowserTooltips={true}
            />
          </div>
        </div>
      </div>
    );
  }
  return (
    <h2 className="mt-15 text-2xl ml-12.5!">{t('Select factors for output in the Options tab')}</h2>
  );
};

export default FactorsTable;
