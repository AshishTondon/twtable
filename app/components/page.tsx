import React from "react";

const Paging = ({createPagelist, pages}:any) => {
    
    return(
        <div className="tablefooter">
            <div className="btn-group" role="group" aria-label="Basic example">
                {/* <button type="button" className="btn btn-outline-secondary">&#8810;</button> */}
                {/* <button type="button" className="btn btn-outline-secondary">&lt;</button> */}
                {createPagelist(pages)}
                {/* <button type="button" className="btn btn-outline-secondary">&gt;</button> */}
                {/* <button type="button" className="btn btn-outline-secondary">&#8811;</button> */}
            </div>
        </div>
    );
}

export default Paging;