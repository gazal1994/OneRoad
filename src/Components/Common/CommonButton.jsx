import React from "react";
import { observer, inject } from "mobx-react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

const CommonButton= inject(
  "users",
  "rides"
)(
  observer((props) => {
    const classes = useStyles();
    return (
         
        <Button variant="contained" color="primary">{props.name}</Button>
      
    );
  })
);

export default CommonButton;
