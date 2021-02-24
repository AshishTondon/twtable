import React from "react";
import Paging from "./page";
import Excel from "../downloadable/excel";
// import { IN_TWTableDataRow } from "../interface"; 

const Container = ({pagination, createPagelist, headers, filteredData, children}:any) =>{
    
    return(
        <div className="table-container">
            <div className="table-header">
                <div className="col-xs-8"></div>
                <div className="col-xs-4 download-file">
                    <a onClick={(event) => Excel(event, headers, filteredData)}>
                        <i className="mdi mdi-file-excel"></i>
                    </a>
                </div>
            </div>

            {children}

            {pagination && <Paging createPagelist={createPagelist}/>}
        </div>
    );
}

export default Container;