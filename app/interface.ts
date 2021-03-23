export interface IN_headers{
    width?: number,
    column?: any,
    display: boolean,
    displayname?: string
}

export interface IN_config{
    pagination?: boolean,
    filter?: boolean,
    pageSize?: number,
    headers: IN_headers[],
    data: any[],
    tableClass?: string,
    serversidePagination?: boolean,
    defaultstyle?: boolean,
    heading?: string
}

export interface IN_TWTableDataRow{
    filteredData:any,
    headers:any,
    startRow:number,
    pageSize:number,
    pagination:boolean
}

