import React, { useState } from 'react';

const DynamicTable = () => {
  const [rows, setRows] = useState(0);
  const [columns, setColumns] = useState(0);
  const [headers, setHeaders] = useState([]);
  const [tableData, setTableData] = useState([]);

  const handleGenerateTable = () => {
    setTableData(Array.from({ length: rows }, () => Array(columns).fill('')));
    setHeaders(Array(columns).fill(''));
  };

  const handleHeaderChange = (index, value) => {
    const newHeaders = [...headers];
    newHeaders[index] = value;
    setHeaders(newHeaders);
  };

  const handleCellChange = (rowIndex, colIndex, value) => {
    const newData = [...tableData];
    newData[rowIndex][colIndex] = value;
    setTableData(newData);
  };

  return (
    <div>
      <div>
        <label>
          Rows:
          <input
            type="number"
            value={rows}
            onChange={(e) => setRows(parseInt(e.target.value))}
          />
        </label>
        <label>
          Columns:
          <input
            type="number"
            value={columns}
            onChange={(e) => setColumns(parseInt(e.target.value))}
          />
        </label>
        <button onClick={handleGenerateTable}>Generate Table</button>
      </div>

      {columns > 0 && (
        <div>
          <h3>Set Column Headers</h3>
          {headers.map((header, index) => (
            <input
              key={index}
              type="text"
              placeholder={`Header ${index + 1}`}
              value={header}
              onChange={(e) => handleHeaderChange(index, e.target.value)}
            />
          ))}
        </div>
      )}

      {tableData.length > 0 && (
        <table border="1">
          <thead>
            <tr>
              {headers.map((header, index) => (
                <th key={index}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, colIndex) => (
                  <td key={colIndex}>
                    <input
                      type="text"
                      value={cell}
                      onChange={(e) =>
                        handleCellChange(rowIndex, colIndex, e.target.value)
                      }
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DynamicTable;
