import { useEffect, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
// import 'ag-grid-community/styles/ag-theme-quartz.css';
import '../../Utils/ag-theme-fresh.css';
import coreState from '../GlobalState/coreState';

// HELPER FUNCTION
function getWidth(numStatements) {
  let widthVal = 230 + 65 * numStatements;
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
  let y = window.innerHeight - 120 - 100;
  if (y < heightVal) {
    y += 'px';
    return y;
  }
  heightVal += 'px';
  return heightVal;
}

// HELPER FUNCTION
function resetWidthAndHeight(numQsorts, numStatements) {
  const table = document.querySelector('#participantQsortData');
  if (table !== null) {
    table.style.height = getHeight(numQsorts);
    table.style.width = getWidth(numStatements);
  }
}

// HELPER FUNCTION
function generateGridColDefs(props) {
  if (props.data.length === undefined) {
    return;
  }
  const gridColDefsQsorts = [
    {
      headerName: 'Num',
      field: 'resNum',
      pinned: true,
      editable: false,
      width: 56,
      cellStyle: {
        textAlign: 'center',
      },
    },
    {
      headerName: 'Participant',
      field: 'respondent',
      width: 150,
      pinned: true,
      editable: false,
      cellStyle: {
        textAlign: 'center',
      },
    },
  ];
  for (let i = 0; i < props.data[0].rawSort.length; i += 1) {
    const tempObj = {};
    tempObj.headerName = `S${i + 1}`;
    tempObj.field = `s${i + 1}`;
    tempObj.width = 50;
    tempObj.pinned = false;
    tempObj.editable = false;
    tempObj.sortable = true;
    tempObj.cellStyle = {
      textAlign: 'right',
    };
    gridColDefsQsorts.push(tempObj);
  }
  return gridColDefsQsorts;
}

// HELPER FUNCTION
function generateGridRowData(props) {
  if (props.data.length === undefined) {
    return;
  }
  const gridRowDataQsorts = [];
  for (let i = 0; i < props.data.length; i += 1) {
    const tempObj = {};
    tempObj.resNum = i + 1;
    tempObj.respondent = props.data[i].name;
    for (let j = 0; j < props.data[i].rawSort.length; j += 1) {
      tempObj[`s${j + 1}`] = props.data[i].rawSort[j];
    }
    gridRowDataQsorts.push(tempObj);
  }
  return gridRowDataQsorts;
}

// COMPONENT
const ParticipantQsortsGrid = (props) => {
  let numQsorts = coreState((state) => state.numQsorts);
  let statements = coreState((state) => state.statements);

  useEffect(() => {
    window.addEventListener('resize', () => {
      resetWidthAndHeight(numQsorts, statements.length);
    });

    return () => {
      window.removeEventListener('resize', () => {
        resetWidthAndHeight(numQsorts, statements.length);
      });
    };
  }, []);

  const gridApi = useRef();

  const onGridReady = (params) => {
    gridApi.current = params.api;
    // columnApi.current = params.columnApi;
  };

  let gridOptions = {
    suppressRowHoverHighlight: false,
    columnHoverHighlight: true,
    enableSorting: true,
  };

  let gridColDefsQsorts;
  let gridRowDataQsorts;
  if (props) {
    gridColDefsQsorts = generateGridColDefs(props);
    gridRowDataQsorts = generateGridRowData(props);
  }

  const style1 = {
    width: getWidth(statements.length),
    height: getHeight(numQsorts),
  };

  return (
    <div id="participantQsortData" style={style1} className="ag-theme-fresh">
      <AgGridReact
        columnDefs={gridColDefsQsorts}
        ref={gridApi}
        rowData={gridRowDataQsorts}
        onGridReady={onGridReady}
        gridOptions={gridOptions}
      />
    </div>
  );
};

export default ParticipantQsortsGrid;
