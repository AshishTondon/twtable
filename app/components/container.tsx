import React from "react";
import Paging from "./page";
import Downloadable from "./downloadable";

const Container: React.FC<any> = ({
  pagination,
  createPagelist,
  headers,
  filteredData,
  pageSize,
  children,
  changePageSize,
  tableHeading,
  pageoption,
  progmessage,
  pages,
  downloadableConfig,
  userfilters,
  arrangement,
  progress,
  styleClass,
  data,
  serversidePagination,
  recordCount,
  showbtn,
  moveProgressBar,
}: any) => {
  console.log("styleClass", styleClass);
  return (
    <div className={`table-container ${styleClass.tableContainer}`}>
      <div className="table-header">
        <div className="col-sm-6">
          <div className="row">
            <div className="col-sm-8">
              <h2>{tableHeading}</h2>
            </div>
            <div className="recordCount col-sm-4">
              {`Records: ${recordCount
                .toString()
                .replace(/(.)(?=(\d{3})+$)/g, "$1,")}`}
            </div>
          </div>
        </div>

        {downloadableConfig.download ? (
          <Downloadable
            headers={headers}
            filteredData={filteredData}
            downloadableConfig={downloadableConfig}
            userfilters={userfilters}
            arrangement={arrangement}
            recordCount={recordCount}
            datafn={data}
            serversidePagination={serversidePagination}
            progress={progress}
            showbtn={showbtn}
            moveProgressBar={moveProgressBar}
            progmessage={progmessage}
          />
        ) : (
          <div className="col-sm-3"></div>
        )}

        <div className="col-sm-3">
          {pagination && (
            <div>
              <span className="pagesize-label">Per Page</span>
              <select
                name="page-length"
                className="page-length from-select"
                defaultValue={pageSize}
                onChange={(event) => changePageSize(event.target.value)}
              >
                {pageoption.map((option: number, dataIndex: number) => (
                  <option value={option} key={dataIndex}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>

      {children}

      {pagination && <Paging createPagelist={createPagelist} pages={pages} />}
    </div>
  );
};

export default Container;
