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
import getDistance from 'geolib/es/getDistance';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import Slide from '@material-ui/core/Slide';
const dateFormat = require('dateformat')
const now = new Date();
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
  snak: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },

  },
}));

const CreateRide = inject(
  "users",
  "rides"
)(
  observer((props) => {
    const classes = useStyles();
    const classe = use();
    const toSqlDate = (date) => {
      const newDtae = new Date(date).toISOString().slice(0, 19).replace("T", " ");
      return newDtae
    }

    function SlideTransition(props) {
      return <Slide {...props} direction="right" />;
    }
    const timeNow = dateFormat(now, "yyyy-mm-dd'T'HH:MM")
    const [open, setOpen] = React.useState({ error: false, success: false });
    const [textInput, setTextInput] = useState({
      location: "",
      destination: "",
      departureTime: `${timeNow}`,
    });
    const handleChange = (autoCompName, autoCompValue) => {

      const name = autoCompName
      const value = autoCompValue
      setTextInput({ ...textInput, [name]: value });

    };
    const trimString = (str) => {
      return str.split(",")[0]
    }


    console.log(textInput)
    const handelClick = async () => {

      if (textInput.location.length === 0) {
        setOpen({ ...open, error: true, success: false, note: "From where you start to ride" })
      }
      if (textInput.destination.length === 0) {
        setOpen({ ...open, error: true, success: false, note: "Where you want to go" })
      }
      else {
        const x = await coordinate(textInput.location)
        const y = await coordinate(textInput.destination)
        const dist = (getDistance(x, y, 1) / 1000)
        const location = { name: trimString(textInput.location), longitude: x.lng, latitude: x.lat }
        const destination = { name: trimString(textInput.destination), longitude: y.lng, latitude: y.lat }
        console.log(location)
        console.log(destination)
        const answer = await props.rides.addRide(
          location,
          destination,
          toSqlDate(textInput.departureTime),
          props.users.loggedInUser.id,
          dist,
          0,
          props.users.users)

        if (answer) {
          setOpen({ ...open, error: false, success: true, note: `The ride created successfully,from ${trimString(textInput.location)} to ${trimString(textInput.destination)}` })

        }
      }

    }



    const coordinate = async (value) => {
      const results = await geocodeByAddress(value)
      const latLng = await getLatLng(results[0])
      return latLng
    }
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return
      }
      setOpen({ ...open, error: false, success: false, error: '' });
    }

    return (
      <div className={classes.root}>


        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          spacing={3}
        >
          <Grid item xs={12}>
            <GoogleMaps name={"location"} handleChange={handleChange} />

          </Grid>
          <Grid item xs={12}>

            <GoogleMaps name={"destination"} handleChange={handleChange} />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="datetime-local"
              label="DepartureTime"
              type="datetime-local"
              name="departureTime"
              defaultValue={textInput.departureTime}
              onChange={(e) => handleChange("departureTime", e.target.value)}
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
        <div className={classes.snak}>
          <Snackbar TransitionComponent={SlideTransition} anchorOrigin={{ vertical: 'top', horizontal: 'left' }} open={open.error} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error">
              {open.note}
            </Alert>
          </Snackbar>
          <Snackbar TransitionComponent={SlideTransition} anchorOrigin={{ vertical: 'top', horizontal: 'left' }} open={open.success} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success">
              {open.note}
            </Alert>
          </Snackbar>
        </div>
      </div>
    );
  })
);

export default CreateRide;
