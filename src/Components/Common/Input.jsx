import React, { useState } from "react";
import { observer, inject } from "mobx-react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Driver from '../../store/users/users.json'

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));
const Input = inject(
  "users",
  "rides"
)(
  observer((props) => {
      const driver=Driver[0]
      const [textInput, setTextInput] = useState({location:'',destination:'',departureTime:''});

      const handleChange = (e) => {
      const name = e.target.name;
      setTextInput({...textInput,[name]:e.target.value});
      /* props.rides.pushTohandelInput(textInput)
      console.log(props.rides.handelInput) */
      /* props.rides.addRide(driver.id,textInput.location,textInput.destination,textInput.departureTime,driver,false,20) */
    };
    const classes = useStyles();
   console.log(textInput)
   
    return (
      <React.Fragment>
        <TextField
          id="outlined-textarea"
          label="Multiline Placeholder"
          placeholder="Placeholder"
          multiline
          variant="outlined"
          value={textInput[props.name]}
          name={props.name} 
          onChange={handleChange}
        />
      </React.Fragment>
    );
  })
);
export default Input;
