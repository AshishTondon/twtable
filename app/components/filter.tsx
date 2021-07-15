import React from "react";

const Filter:React.FC<any> = ({ filter, headers, filterData }: any) => {
  return (
    <React.Fragment>
      {filter && (
        <tr>
          {headers.map(
            (header: any, index: number) =>
              header.display && (
                <td key={index}>
                  {typeof header.column != "function" && (
                    <input
                      type="text"
                      placeholder={"Seach " + header.displayname + "..."}
                      name={header.column}
                      key={index}
                      onChange={(event) => filterData(header.column, event)}
                    />
                  )}
                </td>
              )
          )}
        </tr>
      )}
    </React.Fragment>
  );
};

export default Filter;
