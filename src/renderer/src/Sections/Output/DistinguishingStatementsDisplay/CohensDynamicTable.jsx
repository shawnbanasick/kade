const CohensDynamicTable = (props) => {
  // 1. Extract all unique keys from the array of objects to form columns

  console.log('CohensDynamicTable props.data', JSON.stringify(props, null, 2));

  if (!props.data || props.data.length === 0) {
    return <div>No data available</div>;
  }

  const columns = [...new Set(props.data.flatMap((item) => Object.keys(item)))];
  console.log('CohensDynamicTable columns', JSON.stringify(columns, null, 2));

  const newColNames = columns.map((col) => {
    if (col.includes('factor') && col.includes('CohenLevel')) {
      const factorNum = col.match(/factor(\d+)CohenLevel/)[1];
      return `Factor ${factorNum} Cohen's Level`;
    } else if (col.includes('F') && col.includes('Sort Value')) {
      const factorNum = col.match(/F(\d+) Sort Value/)[1];
      return `Factor ${factorNum} Q Sort Value`;
    } else {
      return col.charAt(0).toUpperCase() + col.slice(1);
    }
  });

  return (
    <table border="1" className="mt-0" style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          {/* 2. Render headers dynamically */}
          {newColNames.map((colName) => (
            <th key={colName} className="border border-black p-1.25">
              {colName}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {/* 3. Render rows dynamically */}
        {props.data.map((row, rowIndex) => (
          <tr
            className={`hover:bg-[rgba(131,202,254,0.6)] ${rowIndex % 2 === 0 ? '' : 'bg-[#eee]'}`}
            key={rowIndex}
          >
            {/* 4. Match row data to the extracted columns */}
            {columns.map((column, colIndex) => (
              <td
                key={column}
                className="border border-black p-1.25"
                style={
                  colIndex < columns.length - 1
                    ? { textAlign: 'center' }
                    : { textAlign: 'left', minWidth: '800px' }
                }
              >
                {row[column] !== undefined ? String(row[column]) : '-'}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CohensDynamicTable;
