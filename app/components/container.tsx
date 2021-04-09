import React from "react";
import Paging from "./page";
import Excel from "../downloadable/excel";

const Container = ({pagination, createPagelist, headers, filteredData, children, changePageSize, tableHeading, pageoption}:any) =>{
    
    return(
        <div className="table-container">
            <div className="table-header">
                <div className="col-xs-6">
                    <h2>{tableHeading}</h2>
                </div>
                <div className="col-xs-3 download-file btn-group" role="group" aria-label="Basic example">
                    <button type="button" className="btn btn-outline-secondary downloadBtn" onClick={(event) => Excel(event, headers, filteredData)}>
                        Excel
                    </button>
                    <button type="button" className="btn btn-outline-secondary downloadBtn" onClick={(event) => Excel(event, headers, filteredData)}>
                        csv
                    </button>
                    <button type="button" className="btn btn-outline-secondary downloadBtn" onClick={(event) => Excel(event, headers, filteredData)}>
                        pdf
                    </button>
                </div>
                <div className="col-xs-3">
                    <select name="page-length" className="page-length from-select" onChange={(event) => changePageSize(event.target.value)}>
                        {pageoption.map(
                                (option:number, dataIndex:number) => (<option value={option} key={dataIndex}>{option}</option>)
                            )
                        }
                        
                    </select>
                </div>
            </div>

            {children}

            {pagination && <Paging createPagelist={createPagelist}/>}
        </div>
    );
}

export default Container;