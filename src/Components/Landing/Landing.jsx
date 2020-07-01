import React from "react";
import { observer, inject } from "mobx-react";
import NavBar from "./NavBar";
const Landing = inject(
  "users",
  "rides"
)(
  observer((props) => {
    return (
      <React.Fragment>
        <NavBar />
      </React.Fragment>
    );
  })
);

export default Landing;
