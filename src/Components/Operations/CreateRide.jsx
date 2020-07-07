import React, { useState } from "react";
import { observer, inject } from "mobx-react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import "../../App.css";
import GoogleMaps from '../Common/Input'
import {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
} from 'react-places-autocomplete';


const use = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  button: {
    backgroundColor: "#c89666",
    color: "white",
    border: "1px solid",
    borderColor: "#c89666",
    textTransform: "none",
    width: 200,
    "&:hover": {
      backgroundColor: "#c89666",
      borderColor: "#c89666",
      boxShadow: "#c89666",
    },
    "&:active": {
      boxShadow: "#c89666",
      backgroundColor: "#c89666",
      borderColor: "#c89666",
    },
    "&:focus": {
      boxShadow: "#c89666",
      borderColor: "#c89666",
    },
  },
}));


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing(16),
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
    const classe = use();
    const toSqlDate = (date) =>
      new Date(date).toISOString().slice(0, 19).replace("T", " ");

    const [textInput, setTextInput] = useState({
      location: "",
      destination: "",
      departureTime: "2020-07-08T10:30",
    });
    const handleChange = (autoCompName,autoCompValue) => {
     
      const name =autoCompName
      const value =autoCompValue
      setTextInput({ ...textInput, [name]: value });
      
    };
    const trimString=(str)=>{
        return str.split(",")[0]
      }
    const handelClick = async () => {
        const x=  await coordinate(textInput.location)
        const y=  await coordinate(textInput.destination)
        console.log(x,y)
        props.rides.addRide(
          trimString(textInput.location),
          trimString(textInput.destination),
        toSqlDate(textInput.departureTime),
        props.users.loggedInUser.id,
        100,
        0,
        props.users.users
      );
      
      /* setTextInput({
        ...textInput,
        location: "",
        destination: "",
        departureTime: "",
        DriverId: "",
      }); */
    };

    const coordinate = async(value)=>{
    const results = await geocodeByAddress(value)
    const latLng = await getLatLng (results[0])
    return latLng
    }
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
   
  
    return (
      <div className={classes.root}>
        {/* <GoogleMaps textInput={textInput}  handleChange={handleChange} /> */}

        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          spacing={3}
        >
          <Grid item xs={12}>
          <GoogleMaps  name={"location"}  handleChange={handleChange} />
           {/*  <TextField
              id="outlined-textarea"
              label=" Location"
              placeholder="Placeholder"
              multiline
              variant="outlined"
              value={textInput.location}
              name="location"
              
            /> */}
          </Grid>
          <Grid item xs={12}>
           {/*  <TextField
              id="outlined-textarea"
              label="Destination"
              placeholder="Placeholder"
              multiline
              variant="outlined"
              value={textInput.destination}
              name="destination"
              onChange={handleChange}
            /> */}
            <GoogleMaps  name={"destination"}  handleChange={handleChange} />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="datetime-local"
              label="DepartureTime"
              type="datetime-local"
              name="departureTime"
              defaultValue={textInput.departureTime}
              onChange={(e)=>handleChange("departureTime",e.target.value)}
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              onClick={handelClick}
              className={classe.button}
              variant="contained"
              color="primary"
            >
              Create Ride
            </Button>
          </Grid>
        </Grid>
      </div>
    );
  })
);

export default CreateRide;
