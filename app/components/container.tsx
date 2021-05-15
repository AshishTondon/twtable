import React from "react";
import Paging from "./page";
import Downloadable from "./downloadable";
const Container = ({ pagination, createPagelist, headers, filteredData, 
                    children, changePageSize, tableHeading, pageoption, 
                    pages, downloadableConfig, userfilters, arrangement, 
                    data, serversidePagination, recordCount }:any) =>{
    
    return(
        <div className="table-container">
            <div className="table-header">
                <div className="col-xs-6">
                    <h2>{tableHeading}</h2>
                </div>
                
                {downloadableConfig.download ? 
                    <Downloadable headers={headers} filteredData={filteredData} downloadableConfig={downloadableConfig}
                                    userfilters={userfilters} arrangement={arrangement} recordCount={recordCount} 
                                    datafn={data} serversidePagination={serversidePagination}/>:
                    <div className="col-xs-3"></div>}
                

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

            {pagination && <Paging createPagelist={createPagelist} pages={pages}/>}
        </div>
    );
}

export default Container;