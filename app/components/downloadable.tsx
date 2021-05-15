import React from "react";
import CSV from "../downloadable/csv";
import Excel from "../downloadable/excel";

const Downloadable = ({headers, filteredData, downloadableConfig, arrangement, datafn,
                        userfilters, recordCount, serversidePagination}:any) => {
    
    const twtableDownloadSupport = ["EXCEL","CSV"];
    
    const getServerReport = async (event:any, reportType:string) => {
        const twtrequest = {
            pageSize: Number(recordCount),
            currentpage: 0,
            userfilters,
            arrangement,
            reportType
        };

        const filteredData = await datafn(twtrequest);

        switch(reportType.toUpperCase()){
            case "EXCEL":
                Excel(event, headers, filteredData.data);
            break;
            case "CSV":
                CSV(event, headers, filteredData.data);
            break;
            default:
        }
    };

    return(
        <div className="col-xs-3 download-file btn-group" role="group" aria-label="report">
            {downloadableConfig.reportOption.map((option:any, index:number) => (
                ((typeof downloadableConfig.reportfn === 'string' || 
                    downloadableConfig.reportfn instanceof String) && 
                    downloadableConfig.reportfn.toLowerCase() === "twtable")?
                        (
                           (twtableDownloadSupport.indexOf(option.toUpperCase()) >= 0)?
                            <button type="button" key={index} className="btn btn-outline-secondary downloadBtn" 
                                                onClick={(event) => 
                                                    serversidePagination? getServerReport(event, option) :
                                                    (option.toUpperCase() === "EXCEL")?
                                                        Excel(event, headers, filteredData):CSV(event, headers, filteredData)}>
                                {option}
                            </button>:
                            console.warn(`Download Option ${option} is not intrenally handled by TWtable. Supported options are ${JSON.stringify(twtableDownloadSupport)}. Use UDF function for using ${option} download option.`)
                        ) :
                        <button type="button" key={index} className="btn btn-outline-secondary downloadBtn" 
                                onClick={() => downloadableConfig.reportfn({pageSize: recordCount,
                                                                            currentpage: 0,
                                                                            userfilters,
                                                                            arrangement,
                                                                            reportType: option})}>
                            {option}
                        </button> 
                
                
            ))}
        </div>
    );
}

export default Downloadable;