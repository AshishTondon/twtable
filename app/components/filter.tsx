import React from "react";

const Filter = ({filter, headers, filterClientSideData}:any) => {

    return(
        <React.Fragment>
            {filter && 
                <tr>
                    {headers.map((header:any, index:number) => (
                        header.display &&
                        <td key={index}> 
                            {(typeof header.column != "function") && <input type="text" placeholder={"Seach " + header.display + "..."} name={header.column} key={index} onChange={(event) => filterClientSideData(header.column,event)}/>}
                        </td>
                    ))}
                </tr>
            }
        </React.Fragment>
        
    );
}

export default Filter;