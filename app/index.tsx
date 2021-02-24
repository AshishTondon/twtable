import React from "react";
import TWTableDataRow from "./components/rows";
import { IN_config } from "./interface"; 
import Container from "./components/container";
import Filter from "./components/filter";

import "./assets/mdi/css/materialdesignicons.min.css";
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
            filteredData: this.props.data,
            tableClass: this.props.tableClass || "table table-striped",
            serversidePagination: this.props.serversidePagination || false,
            headers: this.props.headers,
            userfilters:{},
            startRow:0,
            pages:1,
            currentpage:0,
            defaultstyle: this.props.hasOwnProperty("defaultstyle")?this.props.defaultstyle:true
        }
    }

    componentDidMount() {
        this.refeshpagecount();
    }

    refeshpagecount = () => {
        let pages = 1;

        pages = (this.state.filteredData.length < this.state.pageSize)?pages:Math.ceil(this.state.filteredData.length/this.state.pageSize);

        this.setState({pages});
    }

    changePage = (startPage:number, currentpage:number) => {
        this.setState({startRow: startPage});
        this.setState({currentpage});
    }

    createPagelist = () => {
        let buttonlist = [];

        for(let index = 0; index<this.state.pages; index++){
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

    rearrangerow = (event:any) => {
        let filteredData = [...this.state.filteredData];
        let column = event.target.getAttribute("column");
        let order = event.target.getAttribute("order");

        if(order === "asc"){
            filteredData.sort((a:any,b:any) => (a[column] > b[column]) ? 1 : ((b[column] > a[column]) ? -1 : 0));
            event.target.setAttribute("order", "desc");
        }else{
            filteredData.sort((a:any,b:any) => (a[column] > b[column]) ? -1 : ((b[column] > a[column]) ? 1 : 0));
            event.target.setAttribute("order", "asc");
        }
        
        this.setState({filteredData});
    }

    filterClientSideData = (filter:string,event:any) => {
        let userfilters = this.state.userfilters;
        userfilters[filter] = (typeof event.target.value === "string")?event.target.value:event.target.value.toLowerCase();

        this.setState({userfilters});

        this.refreshGrid();
    }

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

        return(
            <React.Fragment>
                {this.state.defaultstyle && 
                    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossOrigin="anonymous"/>
                }
                
                <Container pagination={this.state.pagination} createPagelist={this.createPagelist} 
                            headers={this.state.headers} filteredData={this.state.filteredData}>
                    <table className={this.state.tableClass}>
                        <thead>
                            <tr>
                                {this.state.headers.map((header:any, index:number) => (
                                    header.display &&
                                    <th key={index} column={ (typeof header.column === "string")?header.column:"" } 
                                        onClick={(event:any) => this.rearrangerow(event)} order="asc">
                                        {header.hasOwnProperty('displayname')?header.displayname:""}
                                        <a><i className="mdi mdi-unfold-more menu-icon"></i></a>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>

                            <Filter filter={this.state.filter} headers={this.state.headers} filterClientSideData={this.filterClientSideData}/>

                            <TWTableDataRow filteredData={this.state.filteredData} 
                                            headers={this.state.headers} 
                                            startRow={this.state.startRow}
                                            pageSize={this.state.pageSize}
                                            pagination={this.state.pagination} />
                        </tbody>
                    </table>
                </Container>
            </React.Fragment>
            
        );
    }
}

export default TWTable;
