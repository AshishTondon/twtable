import React from "react";

const Paging = ({createPagelist, pages}:any) => {
    
    return(
        <div className="tablefooter">
            <div className="btn-group" role="group" aria-label="Basic example">
                <button type="button" className="btn btn-outline-secondary">Left</button>
                {createPagelist(pages)}
                <button type="button" className="btn btn-outline-secondary">Right</button>
            </div>
        </div>
    );
}

export default Paging;