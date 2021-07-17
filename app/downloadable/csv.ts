import React from "react";
import { IN_headers } from "../interface";

const CSV: any = (event: any, headers: IN_headers[], filteredData: any[]) => {
  event.persist();
  let table = "";

  const header = headers
    .map((header) =>
      header.display &&
      !Object.prototype.hasOwnProperty.call(header, "button") &&
      !header.button &&
      Object.prototype.hasOwnProperty.call(header, "displayname") &&
      typeof header.displayname === "string"
        ? header.displayname.match(/,| /g)
          ? `"${header.displayname}"`
          : header.displayname
        : null
    )
    .join(",")
    .replace(/,,/g, ",");

  const rows = filteredData
    .map((node) =>
      headers
        .map((header) =>
          header.display &&
          !Object.prototype.hasOwnProperty.call(header, "button") &&
          !header.button
            ? isNaN(node[header.column]) &&
              node[header.column].toString().match(/,| /g)
              ? `"${node[header.column]}"`
              : node[header.column]
            : null
        )
        .join(",")
        .replace(/,,/g, ",")
    )
    .join("\n");

  table = header + "\n" + rows;

  const ua = window.navigator.userAgent;
  const msie = ua.indexOf("MSIE");
  let sa: any = "";

  if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv:11\./)) {
    // If Internet Explorer
    if (window.navigator.msSaveBlob) {
      const blob = new Blob([table], {
        type: "data:text/csv;",
      });

      sa = window.navigator.msSaveBlob(blob, "report.csv");
    }
  } else {
    sa = window.open("data:text/csv," + encodeURIComponent(table));
  }

  event.preventDefault();
};

export default CSV;
