import React from "react";
import { IN_headers } from "../interface";

window.navigator.msSaveBlob = () => true;

const Excel: any = (event: any, headers: IN_headers[], filteredData: any[]) => {
  event.persist();
  let table = "";

  table = `<html xmlns:x="urn:schemas-microsoft-com:office:excel">`;
  table += `<head><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet>`;

  // headers.forEach((header) => {
  //     table += `<x:Name>${header.display}</x:Name>`
  // });

  table += `<x:WorksheetOptions><x:Panes></x:Panes></x:WorksheetOptions></x:ExcelWorksheet>`;
  table += `</x:ExcelWorksheets></x:ExcelWorkbook></xml></head><body><table>`;
  table += `<tr>`;

  headers.forEach((header) => {
    if (
      header.display &&
      !Object.prototype.hasOwnProperty.call(header, "button") &&
      !header.button
    ) {
      table += `<td>${header.displayname}</td>`;
    }
  });

  table += `</tr>`;
  filteredData.forEach((node) => {
    table += `<tr>`;
    headers.forEach((header) => {
      if (
        header.display &&
        !Object.prototype.hasOwnProperty.call(header, "button") &&
        !header.button
      ) {
        table += `<td>${node[header.column]}</td>`;
      }
    });
    table += `</tr>`;
  });

  table += `</table></body></html>`;

  const ua = window.navigator.userAgent;
  const msie = ua.indexOf("MSIE");
  let sa: any = "";

  if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv:11\./)) {
    // If Internet Explorer
    if (window.navigator.msSaveBlob) {
      const blob = new Blob([table], {
        type: "data:application/vnd.ms-excel;",
      });

      sa = window.navigator.msSaveBlob(blob, "report.xls");
    }
  } else {
    sa = window.open(
      "data:application/vnd.ms-excel," + encodeURIComponent(table)
    );
  }

  event.preventDefault();
};

export default Excel;
