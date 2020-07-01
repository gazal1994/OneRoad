import React from "react";
import { observer, inject } from "mobx-react";
import { Link } from "react-router-dom";




const Operation= inject(
  "users",
  "rides"
)(
  observer((props) => {
  
    return (
      <div>
      Operation
      </div>
    );
  })
);

export default Operation;