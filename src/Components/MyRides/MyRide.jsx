import React, { useState, useEffect } from "react";
import { observer, inject } from "mobx-react";
import Map from './Map'


const MyRide = inject(
  "users",
  "rides"
)(
  observer((props) => {
    debugger;

    return (
      <div>
    
      </div>
    );
  })
);
export default MyRide;

