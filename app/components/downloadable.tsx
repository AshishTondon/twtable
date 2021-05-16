import React, { useState } from "react";
import CSV from "../downloadable/csv";
import Excel from "../downloadable/excel";

class Downloadable extends React.Component<any, any>{
    constructor(props:any){
        super(props);

        this.state = {
            ...props,
            progress:0,
            progmessage:"Intiating Download!!",
            showbtn:false,
            twtableDownloadSupport: ["EXCEL","CSV"]
        }
    }

    moveProgressBar = (progress:number, message:string) => {
        // const id = setInterval(frame, 10);

        // const frame = () => {

        // }
        if(progress === 1){
            this.setState({progress, progmessage:message, showbtn:false});
            
        }else if(progress === 100){
            this.setState({progress, progmessage:message, showbtn:true});
        }
    };

    getServerReport = async (event:any, reportType:string) => {
        const twtrequest = {
            pageSize: Number(this.state.recordCount),
            currentpage: 0,
            userfilters:this.state.userfilters,
            arrangement:this.state.arrangement,
            reportType
        };

        this.moveProgressBar(1, "Fetching Data!!");

        const filteredData = await this.state.datafn(twtrequest);

        this.moveProgressBar(50, "Preparing Report!!");

        switch(reportType.toUpperCase()){
            case "EXCEL":
                await Excel(event, this.state.headers, filteredData.data);
            break;
            case "CSV":
                await CSV(event, this.state.headers, filteredData.data);
            break;
            default:
        }

        this.moveProgressBar(100, "Report download will start any moment!!");
    };

    render(){
        const {showbtn, downloadableConfig, twtableDownloadSupport, serversidePagination, headers, filteredData,
                recordCount, userfilters, arrangement, progress, progmessage} = this.state;

        return(
            <div className="col-xs-3 download-file btn-group" role="group" aria-label="report" >
                {showbtn ? downloadableConfig.reportOption.map((option:any, index:number) => (
                    ((typeof downloadableConfig.reportfn === 'string' || 
                        downloadableConfig.reportfn instanceof String) && 
                        downloadableConfig.reportfn.toLowerCase() === "twtable")?
                            (
                               (twtableDownloadSupport.indexOf(option.toUpperCase()) >= 0)?
                                <button type="button" key={index} className="btn btn-outline-secondary downloadBtn" 
                                                    onClick={(event) => 
                                                        serversidePagination? this.getServerReport(event, option) :
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
                    
                    
                )):<div id="myBar" style={{width:`${progress}%`,height:"30px",backgroundColor:"#04AA6D"}}>
                        {progmessage}
                    </div>}
            </div>
        );
    }
}

export default Downloadable;