import React from "react";

const Error = ({errorMessage}:any) => {

    return(
        <div className="row">
            <h3>{errorMessage}</h3>
        </div>
    );
}

export default Error;