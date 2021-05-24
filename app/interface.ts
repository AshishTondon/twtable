export interface IN_headers{
    width?: number,
    column?: any,
    display: boolean,
    displayname?: string,
    button?:boolean,
    ordersign?:String
}

export interface IN_orderby{
    column: string,
    order: string
}

export interface IN_pagination{
    pageSize: number, 
    currentpage: number,
    userfilters: any,
    arrangement: IN_orderby,
    reportType?: string
}

type propFunction = (params:IN_pagination) => any[];
type propReportFunction = (params:IN_pagination) => boolean;

export interface IN_reportConfig{
    download?: boolean, 
    reportfn?: string | propReportFunction,
    reportOption?: string[]
}

export interface IN_config{
    pagination?: boolean,
    filter?: boolean,
    pageSize?: number,
    headers: IN_headers[],
    data: any[] | propFunction,
    tableClass?: string,
    serversidePagination?: boolean,
    defaultstyle?: boolean,
    heading?: string,
    pageoption: number[],
    downloadableConfig?: IN_reportConfig
}

export interface IN_TWTableDataRow{
    filteredData:any,
    headers:any,
    startRow:number,
    pageSize:number,
    pagination:boolean
}

