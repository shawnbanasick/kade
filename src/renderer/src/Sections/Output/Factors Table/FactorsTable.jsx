import { useState } from 'react';
import styled from 'styled-components';
import { useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';
import calcState from '../../GlobalState/calcState';
import outputState from '../../GlobalState/outputState';
import coreState from '../../GlobalState/coreState';

const getArrayValues = (userSelectedFactors) => {
  const headerRow = [i18n.t('Nm'), i18n.t('Statement'), i18n.t('Nm')];

  const colWidthVals = [60, 250, 60];
  // 110,
  //  90,

  const alignmentVals = ['center', 'left', 'center'];
  // center

  const pinnedVals = [true, true, true];
  // false

  for (let i = 0; i < userSelectedFactors.length; i += 1) {
    const identifier3 = userSelectedFactors[i].slice(7);
    const identifier2 = `F${identifier3} ${i18n.t('Z score')}`;
    const identifier = `F${identifier3} ${i18n.t('Rank')}`;
    headerRow.push(identifier2, identifier);
    colWidthVals.push(110, 90);
    alignmentVals.push('center', 'center');
    pinnedVals.push(false, false);
  }

  return [headerRow, colWidthVals, alignmentVals, pinnedVals];
};

const getGridColDefsFacTable = (numFacs, headerRow, pinnedVals, colWidthVals, alignmentVals) => {
  const gridColDefsFacTable = [];

  for (let i = 0; i < headerRow.length; i += 1) {
    gridColDefsFacTable.push({
      headerName: headerRow[i],
      field: headerRow[i],
      pinned: pinnedVals[i],
      editable: false,
      sortable: true,
      width: colWidthVals[i],
      cellStyle: {
        textAlign: alignmentVals[i],
      },
    }); // end push
  } // end loop

  return gridColDefsFacTable;
};

function getGridRowDataFacTable(data2, headerRow) {
  // prevent empty component mount error
  if (data2 === undefined) {
    return null;
  }
  const data = data2.slice(5);
  const gridRowDataFacTable = [];

  for (let j = 0; j < data.length; j += 1) {
    const tempObj = {};
    tempObj.factorList = data[j][0];

    for (let k = 0; k < headerRow.length; k += 1) {
      tempObj[headerRow[k]] = data[j][k];
    }
    gridRowDataFacTable.push(tempObj);
  }
  return gridRowDataFacTable;
}

function getWidth(numFactors) {
  let widthVal = 383 + 200 * numFactors;
  let x = window.innerWidth - 40 - 152;

  if (x < widthVal) {
    x += 'px';
    return x;
  }
  widthVal += 'px';
  return widthVal;
}

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

const FactorsTable = () => {
  const { t } = useTranslation();
  const numStatements = coreState((state) => state.numStatements);

  let gridOptions = {
    suppressRowHoverHighlight: false,
    columnHoverHighlight: true,
    enableSorting: true,
  };

  const [localStore, setLocalStore] = useState({
    numFactors: 0,
    numStatements: numStatements,
  });

  function resetWidthAndHeight() {
    // this.gridApi.setGridAutoHeight(false);
    const numFactors = localStore.numFactors;
    const numStatements = localStore.numStatements;
    const table = document.querySelector('#innerContainerFactors');
    if (table !== null) {
      table.style.height = getHeight(numStatements);
      table.style.width = getWidth(numFactors);
    }
  }

  const getCurrentData = (headerRow, numFacs) => {
    const data = calcState((state) => state.factorScoreRanksArray);
    const lengthCutOff = numFacs * 2 + 3;
    headerRow.length = lengthCutOff;
    return [data, numFacs];
  };

  useEffect(() => {
    window.addEventListener('resize', () => {
      resetWidthAndHeight();
    });

    return () => {
      window.removeEventListener('resize', () => {
        resetWidthAndHeight();
      });
    };
  }, []);

  const showFactorsTable = outputState((state) => state.showFactorCorrelationsTable);

  // return [headerRow, colWidthVals, alignmentVals, pinnedVals];
  // getState
  const userSelectedFactors = outputState((state) => state.userSelectedFactors);
  const numFacs = userSelectedFactors.length;

  const arrayValues = getArrayValues(userSelectedFactors);

  const currentData = getCurrentData(arrayValues[0], numFacs);

  const numFactors = currentData[1];

  // setLocalStore((preState) => {
  //   return {
  //     ...preState,
  //     numFactors: numFactors,
  //     numStatements: numStatements,
  //   };
  // });

  const gridColDefsFacTable = getGridColDefsFacTable(
    currentData[1], // numFacs
    arrayValues[0], // headerRow
    arrayValues[3], // pinnedVals
    arrayValues[1], // colWidthVals
    arrayValues[2] // alighmentVals
  ); // state.getState("gridColDefsFacTableEigen");
  const gridRowDataFacTable = getGridRowDataFacTable(
    currentData[0], // data
    arrayValues[0] // headerRow
  );

  if (showFactorsTable) {
    return (
      <Container1>
        <p style={{ fontWeight: 'normal', marginTop: 15, textAlign: 'left' }}>
          {t('Click the table headers to re-sort by column')}{' '}
          {t('(low-to-high, high-to-low, original sort)')}.
        </p>
        <div
          id="innerContainerFactors"
          style={{
            width: getWidth(numFactors),
            height: getHeight(numStatements),
          }}
          className="ag-theme-fresh"
        >
          <AgGridReact
            id="factorsTable"
            columnDefs={gridColDefsFacTable}
            rowData={gridRowDataFacTable}
            gridOptions={gridOptions}
            animateRows={true}
            enableBrowserTooltips={true}
          />
        </div>
      </Container1>
    );
  }
  return (
    <h2 style={{ marginTop: 50, marginLeft: 50 }}>
      {t('Select factors for output in the Options tab')}
    </h2>
  );
};

export default FactorsTable;

const Container1 = styled.div`
  padding-bottom: 50px;
`;
