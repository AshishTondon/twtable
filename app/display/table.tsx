import React from "react";
import Container from "../components/container";
import Filter from "../components/filter";
import TWTableDataRow from "../components/rows";
import TWTableServerDataRow from "../components/severrows";

const Table: React.FC<any> = ({
  pagination,
  createPagelist,
  headers,
  filteredData,
  changePageSize,
  tableHeading,
  styleClass,
  pageoption,
  tableClass,
  rearrangerow,
  filter,
  serversidePagination,
  filterServerSideData,
  filterClientSideData,
  sleep,
  startRow,
  pageSize,
  pages,
  downloadableConfig,
  arrangement,
  userfilters,
  data,
  recordCount,
  showbtn,
  progress,
  moveProgressBar,
  progmessage,
}: any) => {
  return (
    <Container
      pagination={pagination}
      createPagelist={createPagelist}
      arrangement={arrangement}
      headers={headers}
      filteredData={filteredData}
      userfilters={userfilters}
      styleClass={styleClass}
      changePageSize={changePageSize}
      tableHeading={tableHeading}
      pageSize={pageSize}
      pageoption={pageoption}
      pages={pages}
      downloadableConfig={downloadableConfig}
      data={data}
      serversidePagination={serversidePagination}
      progmessage={progmessage}
      recordCount={recordCount}
      progress={progress}
      showbtn={showbtn}
      moveProgressBar={moveProgressBar}
    >
      <table className={tableClass}>
        <thead>
          <tr>
            {headers.map((header: any, index: number) => {
              const tempcol =
                typeof header.column === "string" ? header.column : "";
              const temporder = Object.prototype.hasOwnProperty.call(
                header,
                "order"
              )
                ? header.order
                : "asc";
              return (
                header.display && (
                  <th
                    key={index}
                    id={`twheader-${
                      typeof header.column === "string" ? header.column : index
                    }`}
                    column={tempcol}
                    onClick={(event: any) =>
                      rearrangerow(event, tempcol, temporder)
                    }
                    order={temporder}
                  >
                    {Object.prototype.hasOwnProperty.call(header, "displayname")
                      ? header.displayname
                      : ""}
                    <span className="ordersign">
                      {typeof header.column === "string" &&
                      Object.prototype.hasOwnProperty.call(header, "ordersign")
                        ? header.ordersign
                        : "↕"}
                    </span>
                  </th>
                )
              );
            })}
          </tr>
        </thead>
        <tbody>
          <Filter
            filter={filter}
            headers={headers}
            filterData={
              serversidePagination ? filterServerSideData : filterClientSideData
            }
            sleep={sleep}
            serversidePagination={serversidePagination}
          />

          {serversidePagination ? (
            <TWTableServerDataRow
              filteredData={filteredData}
              headers={headers}
              startRow={startRow}
              pageSize={pageSize}
              pagination={pagination}
            />
          ) : (
            <TWTableDataRow
              filteredData={filteredData}
              headers={headers}
              startRow={startRow}
              pageSize={pageSize}
              pagination={pagination}
            />
          )}
        </tbody>
      </table>
    </Container>
  );
};

export default Table;
