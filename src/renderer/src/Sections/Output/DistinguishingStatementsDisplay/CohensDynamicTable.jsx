import { useState, useMemo } from 'react';

const CohensDynamicTable = (props) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  if (!props.data || props.data.length === 0) {
    return <div>No data available</div>;
  }

  const allColumns = [...new Set(props.data.flatMap((item) => Object.keys(item)))];

  const columns = props.factor
    ? allColumns.filter((col) => {
        const isFactor =
          col === `factor${props.factor}CohenLevel` || col === `F${props.factor} Sort Value`;
        const isNonFactorCol = !col.match(/factor\d+CohenLevel/) && !col.match(/F\d+ Sort Value/);
        return isFactor || isNonFactorCol;
      })
    : allColumns;

  if (!props.data || props.data.length === 0) {
    return <div>No data available</div>;
  }

  const newColNames = columns.map((col) => {
    if (col.includes('factor') && col.includes('CohenLevel')) {
      const factorNum = col.match(/factor(\d+)CohenLevel/)[1];
      return (
        <span>
          Factor {factorNum}
          <br />
          Cohen's Level
        </span>
      );
    } else if (col.includes('F') && col.includes('Sort Value')) {
      const factorNum = col.match(/F(\d+) Sort Value/)[1];
      return (
        <span>
          Factor {factorNum}
          <br />Q Sort Value
        </span>
      );
    } else {
      return col.charAt(0).toUpperCase() + col.slice(1);
    }
  });

  const handleSort = (colIndex) => {
    const key = columns[colIndex];
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const sortedData = useMemo(() => {
    if (!sortConfig.key) return props.data;
    return [...props.data].sort((a, b) => {
      const aVal = a[sortConfig.key] ?? '';
      const bVal = b[sortConfig.key] ?? '';
      const aNum = Number(aVal);
      const bNum = Number(bVal);
      const isNumeric = !isNaN(aNum) && !isNaN(bNum) && aVal !== '' && bVal !== '';
      const cmp = isNumeric ? aNum - bNum : String(aVal).localeCompare(String(bVal));
      return sortConfig.direction === 'asc' ? cmp : -cmp;
    });
  }, [props.data, sortConfig]);

  const SortIcon = ({ colKey }) => {
    if (sortConfig.key !== colKey) return <span style={{ opacity: 0.3, marginLeft: 4 }}>⇅</span>;
    return <span style={{ marginLeft: 4 }}>{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>;
  };

  return (
    <table border="1" className="mt-0" style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          {newColNames.map((colName, colIndex) => (
            <th
              key={colName}
              className="border border-black p-1.25"
              onClick={() => handleSort(colIndex)}
              style={{
                cursor: 'pointer',
                userSelect: 'none',
                whiteSpace: 'nowrap',
                width: colIndex < columns.length - 1 ? '1px' : 'auto',
              }}
            >
              {colName}
              <SortIcon colKey={columns[colIndex]} />
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sortedData.map((row, rowIndex) => (
          <tr
            className={`hover:bg-[rgba(131,202,254,0.6)] ${rowIndex % 2 === 0 ? '' : 'bg-[#eee]'}`}
            key={rowIndex}
          >
            {columns.map((column, colIndex) => (
              <td
                key={column}
                className="border border-black p-1.25"
                style={
                  colIndex < columns.length - 1
                    ? { textAlign: 'center', width: '1px', whiteSpace: 'nowrap' }
                    : { textAlign: 'left', minWidth: '500px' }
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
