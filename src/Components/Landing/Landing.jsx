import React from "react";
import { observer, inject } from "mobx-react";
import NavBar from "./NavBar";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
const Landing = inject(
  "users",
  "rides"
)(
  observer((props) => {
    return (
      <React.Fragment>
        <NavBar />
        <Link
          style={{ textDecoration: "none", color: "white" }}
          to="/operation/passenger"
        >
        <Button  variant="contained" color="primary">Catch A Ride</Button>  
        </Link>
        <Link
          style={{ textDecoration: "none", color: "white" }}
          to="/operation/CreateRide"
        >
          <Button  variant="contained" color="primary">Create Carpool</Button>  
        </Link>
      </React.Fragment>
    );
  })
);

export default Landing;
