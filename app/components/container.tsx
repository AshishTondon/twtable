import React from "react";
import Paging from "./page";
import Excel from "../downloadable/excel";

const Container = ({pagination, createPagelist, headers, filteredData, children, changePageSize, tableHeading}:any) =>{
    
    return(
        <div className="table-container">
            <div className="table-header">
                <div className="col-xs-6">
                    <h2>{tableHeading}</h2>
                </div>
                <div className="col-xs-3 download-file btn-group" role="group" aria-label="Basic example">
                    <button type="button" className="btn btn-outline-secondary" onClick={(event) => Excel(event, headers, filteredData)}>
                        <i className="mdi mdi-file-excel"></i>
                    </button>
                    <button type="button" className="btn btn-outline-secondary" onClick={(event) => Excel(event, headers, filteredData)}>
                        <i className="mdi mdi-file-delimited"></i>
                    </button>
                    <button type="button" className="btn btn-outline-secondary" onClick={(event) => Excel(event, headers, filteredData)}>
                        <i className="mdi mdi-file-pdf"></i>
                    </button>
                </div>
                <div className="col-xs-3">
                    <select name="page-length" className="page-length from-select" onChange={(event) => changePageSize(event.target.value)}>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                    </select>
                </div>
            </div>

            {children}

            {pagination && <Paging createPagelist={createPagelist}/>}
        </div>
    );
}

export default Container;