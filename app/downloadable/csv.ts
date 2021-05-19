import React from "react";
import {IN_headers} from "../interface";

const CSV = (event:any, headers:IN_headers[], filteredData:any[]) => {

    let table = "";

    var header = headers.map((header) => (
            (header.display && (!header.hasOwnProperty("button") && 
            !header.button) && header.hasOwnProperty("displayname") && 
            typeof header.displayname === 'string') ? header.displayname.match(/,| /g)?`"${header.displayname}"`:header.displayname : null
        )).join(",").replace(/,,/g, ",");

    var rows = filteredData.map((node) => (
            headers.map((header) => (
                (header.display && (!header.hasOwnProperty("button") && !header.button))?
                    (isNaN(node[header.column]) && node[header.column].toString().match(/,| /g)?
                        `"${node[header.column]}"`:node[header.column]) 
                    : null
            )).join(",").replace(/,,/g, ",")
        )).join("\n");

    table = header + "\n" + rows;

    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE");
    let sa:any = "";

    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) { // If Internet Explorer 
        if (window.navigator.msSaveBlob) {
            var blob = new Blob([table], {
                type: "data:text/csv;"
            });

            sa = window.navigator.msSaveBlob(blob, "report.csv");
        }
    } else {
        sa = window.open('data:text/csv,' + encodeURIComponent(table));
    }
    
    event.preventDefault();
}

export default CSV;