import React from "react";
import { IN_config } from "./interface"; 
import Table from "./display/table";
import Error from "./display/error"; 

import "./assets/css/style.css";

declare module 'react' {
    interface ButtonHTMLAttributes<T> {
        startpage?: number;
    }

    interface ThHTMLAttributes<T> {
        column?: string;
        order?: string;
    }
}

class TWTable extends React.Component<IN_config, any>{

    constructor(props:IN_config){
        super(props);

        const defReportConfig = {download: true, 
                                reportfn: "twtable", 
                                reportOption: ["CSV","EXCEL"]};
        
        const defPageoption = [5,10,15,20,25];

        this.state = {
            pagination : this.props.pagination || false,
            filter: this.props.filter || false,
            pageSize: this.props.pageSize || 10,
            data: this.props.data,
            pageoption: this.props.pageoption || defPageoption,
            tableClass: this.props.tableClass || "table table-striped",
            serversidePagination: this.props.serversidePagination || false,
            filteredData: (this.props.hasOwnProperty("serversidePagination") && this.props.serversidePagination)? [] : this.props.data,
            headers: this.props.headers,
            userfilters:{},
            startRow:0,
            pages:1,
            currentpage:0,
            tableHeading:this.props.heading || "",
            defaultstyle: this.props.hasOwnProperty("defaultstyle")?this.props.defaultstyle:true,
            arrangement:{},
            recordCount: 0,
            keyStrokeCount: 0, //For Serverside filters
            isError : false,
            errorMessage: "",
            downloadableConfig: Object.assign(defReportConfig, this.props.downloadableConfig),
            showbtn: true,
            progress: 0,
            progmessage: "Intiating Download!!",
            startOffset:0,
            endOffset:1
        };

        this.changePageSize = this.changePageSize.bind(this);
        this.moveProgressBar = this.moveProgressBar.bind(this);
        
    }

    async componentWillMount() {
        await this.validateProprty();
    }

    componentDidMount() {
        this.refeshpagecount();
    }

    isFunction = (functionToCheck:any) => {
        return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
    }

    validateProprty = () => {
        const { serversidePagination, data } = this.state;
        let isError = false;
        let errorMessage = "";
        
        if(serversidePagination && typeof data != "function"){
            isError = true;
            errorMessage = "With server side pagination 'data' attribute should be of type Function.";
        }else if(!serversidePagination && !Array.isArray(data)){
            isError = true;
            errorMessage = "With client side pagination 'data' attribute should be of type array of object.";
        }

        this.setState({ isError });
        this.setState({ errorMessage });
    }

    sleep = (milliseconds:number) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }

    async loadServerSideData(issleep:boolean=false){
        
        // TODO
        // if(issleep){
        //     if(this.state.keyStrokeCount > 1){
        //         await this.setState({keyStrokeCount: this.state.keyStrokeCount - 1});
    
        //         return null;
        //     }

        //     this.sleep(2000);
        // }

        const twtrequest = {
            pageSize: Number(this.state.pageSize),
            currentpage: Number(this.state.currentpage),
            userfilters: this.state.userfilters,
            arrangement: this.state.arrangement
        };
                    
        const filteredData = await this.state.data(twtrequest);

        await this.setState({filteredData: filteredData.data});
        await this.setState({recordCount: filteredData.recordCount});

        let currpage = (this.state.recordCount/this.state.pageSize);

        if(currpage < this.state.currentpage){
            this.changePage(currpage*this.state.pageSize, (currpage-1 < 0)?0:currpage-1);
        }
    }

    async changePageSize(pageSize:number) {
        await this.setState({pageSize});

        await this.refeshpagecount();

        if(this.state.serversidePagination){
            this.loadServerSideData();
        }else{
            this.refreshGrid();
        }
        
    }

    formattheaders = async (column:string|null = null, order:string|null = null) => {
        const {headers} = this.state;

        const tempheaders = headers.map((header:any) => (header.hasOwnProperty("column") && typeof header.column === "string" && header.column === column)?
                        order === "asc"?{...header, ordersign:"↓"}:{...header, ordersign:"↑"}
                        :{...header, ordersign:"↕"});

        await this.setState({headers:tempheaders});
    }

    refeshpagecount = async() => {
        let pages = 1;
        await this.formattheaders();

        // Check for Server side Pagination
        if(this.state.serversidePagination && !this.state.isError){
            await this.loadServerSideData();
        }else{
            await this.setState({recordCount: this.state.filteredData.length});
        }

        const {recordCount, pageSize} = this.state;

        pages = (recordCount < pageSize)?pages:Math.ceil(recordCount/pageSize);

        

        this.setState({pages});
    }

    changePage = async (startPage:number, currentpage:number) => {
        this.setState({startRow: startPage});
        await this.setState({currentpage: Math.floor(currentpage)});

        if(this.state.serversidePagination){
            await this.loadServerSideData();
        }
    }

    createPagelist = (pages:number) => {
        let buttonlist = [];
        let {currentpage} = this.state;

        const startOffset = (currentpage-2 < 0)?0:currentpage-2;
        const endOffset = (startOffset + 5 < pages)?startOffset + 5 : pages;

        if(currentpage > 0){
            buttonlist.push(<button type="button" className="btn btn-outline-secondary" 
                onClick={() => this.changePage(0,0)} key="expev">&#8810;</button>);

            buttonlist.push(<button type="button" className="btn btn-outline-secondary" key="pev"
                onClick={() => this.changePage((currentpage-1)*this.state.pageSize, (currentpage-1))}>&lt;</button>);
        }
        
        for(let index=startOffset; index<endOffset; index++){
            if(currentpage === index){
                buttonlist.push(<button type="button" className="btn btn-outline-secondary active" key={index}
                                    onClick={() => this.changePage(index*this.state.pageSize, index)}>{index+1}</button>);
            }else{
                buttonlist.push(<button type="button" className="btn btn-outline-secondary" key={index}
                                    onClick={() => this.changePage(index*this.state.pageSize, index)}>{index+1}</button>);
            }
        }

        if(currentpage < (pages-1)){
            buttonlist.push(<button type="button" className="btn btn-outline-secondary" key="next"
                onClick={() => this.changePage((currentpage+1)*this.state.pageSize, (currentpage+1))}>&gt;</button>);

            buttonlist.push(<button type="button" className="btn btn-outline-secondary" key="exnext"
                onClick={() => this.changePage((pages-1)*this.state.pageSize, pages-1)}>&#8811;</button>);
        }
        // this.setState({startOffset, endOffset});

        return(buttonlist);
    }

    rearrangerow = async (event:any, column:string, order:string) => {
        
        let {filteredData, serversidePagination, headers} = this.state;

        console.log("headers", headers)
        let arrangement = {column, order};
        let recordCount = 0;
        await this.setState({arrangement});

        if(serversidePagination){
            if(order === "asc"){
                headers = headers.map((header:any) => ( 
                    (typeof header.column === "string" &&  header.column === column)?{...header, order:"desc"}:header ));
            }else{
                headers = headers.map((header:any) => ( 
                    (typeof header.column === "string" &&  header.column === column)?{...header, order:"asc"}:header ));
            }
             
            this.loadServerSideData();
        }else{
            //Client Side Pagination Rearrangement
            if(order === "asc"){
                filteredData.sort((a:any,b:any) => (a[column] > b[column]) ? 1 : ((b[column] > a[column]) ? -1 : 0));
                headers = headers.map((header:any) => ( 
                    (typeof header.column === "string" &&  header.column === column)?{...header, order:"desc"}:header ));
            }else{
                filteredData.sort((a:any,b:any) => (a[column] > b[column]) ? -1 : ((b[column] > a[column]) ? 1 : 0));
                headers = headers.map((header:any) => ( 
                    (typeof header.column === "string" &&  header.column === column)?{...header, order:"asc"}:header ));
            }

            recordCount = filteredData.length;
            this.setState({recordCount});
            this.setState({filteredData});
        }

        await this.setState({headers});

        await this.formattheaders(column, order);
        
    }

    filterServerSideData = async (filter:string,event:any) => {
        const eventValue = event.target.value;
        let userfilters = this.state.userfilters;

        userfilters[filter] = (typeof eventValue === "string")?eventValue.toLowerCase():eventValue;

        await this.setState({keyStrokeCount:this.state.keyStrokeCount + 1 });
        await this.setState({userfilters});
        
        this.refeshpagecount();
    }

    filterClientSideData = (filter:string,event:any) => {
        const eventValue = event.target.value;
        let userfilters = this.state.userfilters;

        userfilters[filter] = (typeof eventValue === "string")?eventValue.toLowerCase():eventValue;

        this.setState({userfilters});

        this.refreshGrid();
    }

    // Client Side Function Only
    refreshGrid = async () => {
        let filteredData:any = [];
        let isDisplay = false;
        let nodeVal:any = "";

        this.state.data.forEach((node : any) => {
            isDisplay = true;
            
            Object.keys(this.state.userfilters).forEach((key : any) => {
                 nodeVal = (typeof node[key] == "string")?node[key].toLowerCase():node[key];

                 if(this.state.userfilters[key].length === 0 || nodeVal.toString().includes(this.state.userfilters[key])){
                     isDisplay = isDisplay && true;
                 }else{
                     isDisplay = isDisplay && false;
                 }   
             });

             if(isDisplay){
                 filteredData.push(node);
             }
        });

        await this.setState({filteredData});
        
        this.refeshpagecount();

    }

    moveProgressBar = (progress:number, message:string) => {
        if(progress >= 1 && progress < 100){
            this.setState({progress, progmessage:message, showbtn:false});
            
        }else if(progress === 100){
            this.setState({progress, progmessage:message, showbtn:true});
        }
    };

    render(){

        const { errorMessage,  pagination, headers, filteredData, tableHeading, pageoption, pages, userfilters,
                tableClass, filter, serversidePagination, startRow, pageSize, defaultstyle, isError, downloadableConfig,
                arrangement, data, recordCount, showbtn, progress, progmessage } = this.state;
        return(
            <React.Fragment>
                
                {defaultstyle && 
                    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" 
                        integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossOrigin="anonymous"/>
                }
                
                { isError ?
                    <Error errorMessage={errorMessage} />  :
                    <Table pagination={pagination} createPagelist={this.createPagelist} headers={headers} data={data}
                            filteredData={filteredData} changePageSize={this.changePageSize} tableHeading={tableHeading} 
                            pageoption={pageoption} tableClass={tableClass} rearrangerow={this.rearrangerow} pages={pages}
                            filter={filter} serversidePagination={serversidePagination} filterServerSideData={this.filterServerSideData}
                            filterClientSideData={this.filterClientSideData} sleep={this.sleep} startRow={startRow} pageSize={pageSize}
                            downloadableConfig={downloadableConfig} userfilters={userfilters} arrangement={arrangement}
                            recordCount={recordCount} progress={progress} showbtn={showbtn} progmessage={progmessage}
                            moveProgressBar={this.moveProgressBar}/>
                }
                  
                
            </React.Fragment>
            
        );
    }
}

export default TWTable;
