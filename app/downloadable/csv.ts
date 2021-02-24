import React from "react";
import {IN_headers} from "../interface";

const CSV = (event:any, headers:IN_headers[], filteredData:any[]) => {

    let table = "";

    headers.forEach((header) => {
        table += `${header.display}`;
    });

}

export default CSV;