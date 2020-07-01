import React from "react";
import { observer, inject } from "mobx-react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Input from './Input'
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
    const handelClick =()=>{
      if(props.operation=="driver"||props.operation=="passenger"){
      props.rides.addRide(props.rides.handelInput)
      props.setTextInput({...props.inputText,location:'',destination:'',departureTime:''})
    }
     
    }
    /* props.rides.addRide(driver.id,textInput.location,textInput.destination,textInput.departureTime,driver,false,20) */
    const classes = useStyles();
    return (
         
        <Button onClick={handelClick} variant="contained" color="primary">{props.name}</Button>
      
    );
  })
);

export default CommonButton;
