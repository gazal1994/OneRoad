import React, { useState } from "react";
import { observer, inject } from "mobx-react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));




const CreateRide = inject(
  "users",
  "rides"
)(
  observer((props) => {
    const classes = useStyles();

    const [textInput, setTextInput] = useState({ location: '', destination: '', departureTime: '',DriverId: ''});
    const handleChange = (e) => {
      const name = e.target.name;
      setTextInput({ ...textInput, [name]: e.target.value });
    }
    const handelClick = () => {
    props.rides.addRide(textInput.location ,textInput.destination,textInput.departureTime,textInput.DriverId,0,0)
    setTextInput({ ...textInput,location: '', destination: '', departureTime: '',DriverId:''});
      }
    
  console.log(textInput)

    return (
      <form className={classes.container} noValidate>
        
          <TextField
          id="outlined-textarea"
          label=" location"
          placeholder="Placeholder"
          multiline
          variant="outlined"
          value={textInput.location}
          name="location"
          onChange={handleChange}
        />
          <TextField
          id="outlined-textarea"
          label="destination"
          placeholder="Placeholder"
          multiline
          variant="outlined"
          value={textInput.destination}
          name="destination"
          onChange={handleChange}
        />
          <TextField
          id="outlined-textarea"
          label="departure time"
          placeholder="Placeholder"
          multiline
          variant="outlined"
          value={textInput.departureTime}
          name="departureTime"
          onChange={handleChange}
        />
        {/* <TextField
        id="datetime-local"
        label="Departure Time"
        type="datetime-local"
        defaultValue="2020-07-08T10:30"
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
      /> */}
        <TextField
          id="outlined-textarea"
          label="DriverId"
          placeholder="Placeholder"
          multiline
          variant="outlined"
          value={textInput.DriverId}
          name="DriverId"
          onChange={handleChange}
        />
        <Button onClick={handelClick} variant="contained" color="primary">Create Ride</Button>
       

        </form>
    );
  })
);

export default CreateRide;