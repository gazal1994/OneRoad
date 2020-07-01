import React from "react";
import { observer, inject } from "mobx-react";
import NavBar from "./NavBar";
import CommonButton from "../Common/CommonButton";
import { Link } from "react-router-dom";
import { Container } from "@material-ui/core";
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
          <CommonButton name={"Catch A Ride"} />
        </Link>
        <Link
          style={{ textDecoration: "none", color: "white" }}
          to="/operation/driver"
        >
          <CommonButton name={"Create Carpool"} />
        </Link>
      </React.Fragment>
    );
  })
);

export default Landing;
