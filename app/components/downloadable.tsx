import React from "react";
import CSV from "../downloadable/csv";
import Excel from "../downloadable/excel";

const Downloadable = ({headers, filteredData, downloadableConfig, arrangement, datafn, progmessage,
                        userfilters, recordCount, serversidePagination, showbtn, progress, moveProgressBar}:any) => {
    
    const twtableDownloadSupport = ["EXCEL","CSV"];
    
    const getServerReport = async (event:any, reportType:string) => {
        moveProgressBar(10, "Intiating Download!!");

        const twtrequest = {
            pageSize: Number(recordCount),
            currentpage: 0,
            userfilters,
            arrangement,
            reportType
        };

        moveProgressBar(30, "Fetching Data!!");
        
        const filteredData = await datafn(twtrequest);

        moveProgressBar(70, "Preparing Report!!");

        switch(reportType.toUpperCase()){
            case "EXCEL":
                Excel(event, headers, filteredData.data);
            break;
            case "CSV":
                CSV(event, headers, filteredData.data);
            break;
            default:
        }

        moveProgressBar(100, "Report download will start any moment!!");
    };

    return(
        <div className="col-xs-3 download-file btn-group" role="group" aria-label="report">
            {showbtn ? downloadableConfig.reportOption.map((option:any, index:number) => (
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
                    
                    
                )):<React.Fragment><span style={{width:"100%",position:"absolute",height:"100%",fontWeight:"bold",padding:"4px 0",textAlign:"center"}}>{progmessage}</span>
                                    <div id="myBar" style={{width:`${progress}%`,height:"30px",backgroundColor:"#04AA6D"}}></div></React.Fragment>}
        </div>
    );
}

export default Downloadable;