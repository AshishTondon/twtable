import React from "react";

const Error: React.FC<any> = ({ errorMessage }: any) => {
  return (
    <div className="row">
      <h3>{errorMessage}</h3>
    </div>
  );
};

export default Error;
