import React from "react";
import Container from "../components/container";
import Filter from "../components/filter";
import TWTableDataRow from "../components/rows";

const Table = ({pagination, createPagelist, headers, filteredData, changePageSize, tableHeading, 
                pageoption, tableClass, rearrangerow, filter, serversidePagination, filterServerSideData,
                filterClientSideData, sleep, startRow, pageSize}:any) => {

    return(
        <Container pagination={pagination} createPagelist={createPagelist} 
                    headers={headers} filteredData={filteredData}
                    changePageSize={changePageSize} tableHeading={tableHeading}
                    pageoption={pageoption}>
            <table className={tableClass}>
                <thead>
                    <tr>
                        {headers.map((header:any, index:number) => (
                            header.display &&
                            <th key={index} column={ (typeof header.column === "string")?header.column:"" } 
                                onClick={(event:any) => rearrangerow(event)} order="asc">
                                {header.hasOwnProperty('displayname')?header.displayname:""}
                                <a><i className="mdi mdi-unfold-more menu-icon"></i></a>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>

                    <Filter filter={filter} headers={headers} f
                            filterData={(serversidePagination)?filterServerSideData:filterClientSideData} 
                            sleep={sleep} serversidePagination={serversidePagination}/>

                    <TWTableDataRow filteredData={filteredData} 
                                    headers={headers} 
                                    startRow={startRow}
                                    pageSize={pageSize}
                                    pagination={pagination} />
                </tbody>
            </table>
        </Container>
    );
}

export default Table;