import React from "react";

const Paging = ({createPagelist, pages}:any) => {
    
    return(
        <div className="tablefooter">
            <div className="btn-group" role="group" aria-label="Basic example">
                {createPagelist(pages)}
            </div>
        </div>
    );
}

export default Paging;