import React from "react";
import { IN_TWTableDataRow } from "../interface";

const TWTableDataRow:React.FC<IN_TWTableDataRow> = ({
  filteredData,
  headers,
  startRow,
  pageSize,
  pagination,
}: IN_TWTableDataRow) => {
  return (
    <React.Fragment>
      {filteredData.map((node: any, dataIndex: number) => (
        <tr key={dataIndex}>
          {headers.map(
            (header: any, index: number) =>
              header.display && (
                <td key={index}>
                  {typeof header.column === "function"
                    ? header.column(node)
                    : node[header.column]}
                </td>
              )
          )}
        </tr>
      ))}
    </React.Fragment>
  );
};

export default TWTableDataRow;
