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
        order?:string;
    }
}

class TWTable extends React.Component<IN_config, any>{

    constructor(props:IN_config){
        super(props);

        this.state = {
            pagination : this.props.pagination || false,
            filter: this.props.filter || false,
            pageSize: this.props.pageSize || 10,
            data: this.props.data,
            pageoption: this.props.pageoption || [5,10,15,20,25],
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
            errorMessage: ""
        };

        this.changePageSize = this.changePageSize.bind(this);
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

    refeshpagecount = async() => {
        let pages = 1;

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
        await this.setState({currentpage});

        if(this.state.serversidePagination){
            await this.loadServerSideData();
        }
    }

    createPagelist = (pages:number) => {
        let buttonlist = [];
        console.log("createPagelist_pages",pages);
        for(let index = 0; index<pages; index++){
            if(this.state.currentpage === index){
                buttonlist.push(<button type="button" className="btn btn-outline-secondary active" 
                                    onClick={(event) => this.changePage(index*this.state.pageSize, index)}>{index+1}</button>);
            }else{
                buttonlist.push(<button type="button" className="btn btn-outline-secondary" 
                                    onClick={(event) => this.changePage(index*this.state.pageSize, index)}>{index+1}</button>);
            }
        }

        return(buttonlist);
    }

    rearrangerow = async (event:any) => {
        let filteredData = [...this.state.filteredData];
        let column = event.target.getAttribute("column");
        let order = event.target.getAttribute("order");
        let arrangement = {column, order};
        let recordCount = 0;
        await this.setState({arrangement});

        if(this.state.serversidePagination){
            if(order === "asc"){
                event.target.setAttribute("order", "desc");
            }else{
                event.target.setAttribute("order", "asc");
            }

            this.loadServerSideData();
        }else{
            //Client Side Pagination Rearrangement
            if(order === "asc"){
                filteredData.sort((a:any,b:any) => (a[column] > b[column]) ? 1 : ((b[column] > a[column]) ? -1 : 0));
                event.target.setAttribute("order", "desc");
            }else{
                filteredData.sort((a:any,b:any) => (a[column] > b[column]) ? -1 : ((b[column] > a[column]) ? 1 : 0));
                event.target.setAttribute("order", "asc");
            }

            recordCount = filteredData.length;

            this.setState({recordCount});
            this.setState({filteredData});
        }
        
    }

    filterServerSideData = async (filter:string,event:any) => {
        let userfilters = this.state.userfilters;
        userfilters[filter] = (typeof event.target.value === "string")?event.target.value.toLowerCase():event.target.value;

        await this.setState({keyStrokeCount:this.state.keyStrokeCount + 1 });
        await this.setState({userfilters});
        
        this.refeshpagecount();
    }

    filterClientSideData = (filter:string,event:any) => {
        let userfilters = this.state.userfilters;
        userfilters[filter] = (typeof event.target.value === "string")?event.target.value.toLowerCase():event.target.value;

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

    render(){

        const { errorMessage,  pagination, headers, filteredData, tableHeading, pageoption, pages,
                tableClass, filter, serversidePagination, startRow, pageSize, defaultstyle, isError } = this.state;
        return(
            <React.Fragment>

                {defaultstyle && 
                    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" 
                        integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossOrigin="anonymous"/>
                }
                
                { isError ?
                    <Error errorMessage={errorMessage} />  :
                    <Table pagination={pagination} createPagelist={this.createPagelist} headers={headers} 
                            filteredData={filteredData} changePageSize={this.changePageSize} tableHeading={tableHeading} 
                            pageoption={pageoption} tableClass={tableClass} rearrangerow={this.rearrangerow} pages={pages}
                            filter={filter} serversidePagination={serversidePagination} filterServerSideData={this.filterServerSideData}
                            filterClientSideData={this.filterClientSideData} sleep={this.sleep} startRow={startRow} pageSize={pageSize} />
                }
                  
                
            </React.Fragment>
            
        );
    }
}

export default TWTable;
